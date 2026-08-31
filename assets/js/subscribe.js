/*
 * ryos.io newsletter signup — talks to the same-origin io.ryos.api service.
 *
 * The captcha challenge lives in the server session (JSESSIONID cookie): loading
 * the <img> from /api/captcha both shows the image and stores the challenge, and
 * because the API is same-origin the cookie rides along on the later POST. No
 * CORS, no keys. The API replies with a short body we map to a message:
 *   200 "verification-sent" | "already-subscribed"
 *   403 "email" | "captcha"
 */
(function () {
  var root = document.querySelector(".subscribe");
  if (!root) return;

  var api = root.getAttribute("data-api") || "/api";
  var form = root.querySelector(".subscribe-form");
  var email = root.querySelector("#subscribe-email");
  var captcha = root.querySelector("#subscribe-captcha");
  var image = root.querySelector(".subscribe-captcha-img");
  var refresh = root.querySelector(".subscribe-captcha-refresh");
  var submit = root.querySelector(".subscribe-submit");
  var message = root.querySelector(".subscribe-message");

  function newCaptcha() {
    // Cache-buster so each load pulls a fresh challenge into the session.
    image.src = api + "/captcha?t=" + Date.now();
    captcha.value = "";
  }

  function say(text, kind) {
    message.textContent = text;
    message.hidden = false;
    message.classList.remove("is-error", "is-ok");
    if (kind) message.classList.add(kind === "ok" ? "is-ok" : "is-error");
  }

  var MESSAGES = {
    "verification-sent": ["Almost there — check your inbox and click the confirmation link.", "ok"],
    "already-subscribed": ["You're already subscribed. Thanks!", "ok"],
    email: ["Please enter a valid email address.", "error"],
    captcha: ["That captcha didn't match — here's a new one.", "error"],
    "mail-failed": ["We couldn't send the confirmation email — please check the address and try again.", "error"],
    "rate-limited": ["Too many attempts — please wait a few minutes and try again.", "error"],
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submit.disabled) return;

    if (!email.value.trim() || !captcha.value.trim()) {
      say("Please fill in your email and the captcha.", "error");
      return;
    }

    submit.disabled = true;
    say("Submitting…");

    var honeypot = root.querySelector("#subscribe-website");
    var body = new URLSearchParams();
    body.set("email", email.value.trim());
    body.set("captcha", captcha.value.trim());
    body.set("website", honeypot ? honeypot.value : "");

    fetch(api + "/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "same-origin",
      body: body.toString(),
    })
      .then(function (r) {
        return r.text().then(function (t) { return { ok: r.ok, body: t.trim() }; });
      })
      .then(function (res) {
        var m = MESSAGES[res.body] || (res.ok
          ? ["Thanks — please check your inbox.", "ok"]
          : ["Something went wrong. Please try again.", "error"]);
        say(m[0], m[1]);
        if (m[1] === "ok") {
          form.reset();
        }
        // Captcha is single-use on the server; always refresh after a submit.
        newCaptcha();
      })
      .catch(function () {
        say("Couldn't reach the server. Please try again in a moment.", "error");
        newCaptcha();
      })
      .finally(function () {
        submit.disabled = false;
      });
  });

  refresh.addEventListener("click", newCaptcha);
  newCaptcha();
})();
