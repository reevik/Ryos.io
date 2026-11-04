/*
 * Product waitlist — talks to the same-origin io.ryos.api service at /api.
 *
 * POST { email, product, website } form-encoded to /api/waitlist. The API keeps
 * its answer to a single word so the copy lives here:
 *   200 "verification-sent" | "already-on-list"
 *   403 "email"   404 "product"   429 "rate-limited"   502 "mail-failed"
 *
 * Double opt-in: the link in the confirmation mail hits /api/waitlist/verify and
 * redirects back here with ?waitlist=confirmed (or =error), which we reflect.
 * A spot only counts once confirmed.
 */
(function () {
  var box = document.getElementById("waitlist-box");
  if (!box) return;

  var form = document.getElementById("waitlist-form");
  var email = document.getElementById("waitlist-email");
  var message = document.getElementById("waitlist-message");
  var api = box.getAttribute("data-api") || "/api";

  function showDone(title, text) {
    box.innerHTML =
      '<div class="ap-waitlist__done">' +
      '<div class="ap-waitlist__done-title"></div>' +
      '<p class="ap-lede"></p></div>';
    // textContent, not innerHTML: these strings come from front matter, and
    // there is no reason for markup to reach the page through them.
    box.querySelector(".ap-waitlist__done-title").textContent = title;
    box.querySelector(".ap-lede").textContent = text;
  }

  function fail(text) {
    message.textContent = text;
    message.classList.add("is-error");
  }

  // Coming back from the confirmation link.
  var state = new URLSearchParams(window.location.search).get("waitlist");
  if (state === "confirmed") {
    showDone(
      box.getAttribute("data-done-title") || "You're confirmed",
      box.getAttribute("data-confirmed-text") || "You're on the list."
    );
    return;
  }
  if (state === "error" && message) {
    fail("That confirmation link has expired or was already used.");
  }

  if (!form) return;

  email.addEventListener("input", function () {
    email.classList.remove("is-invalid");
    message.textContent = "";
    message.classList.remove("is-error");
  });

  var MESSAGES = {
    email: "That email address doesn't look right.",
    product: "This waitlist isn't open yet.",
    "rate-limited": "Too many attempts — please wait a few minutes and try again.",
    "mail-failed": "We couldn't send the confirmation email. Please check the address and try again."
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    message.classList.remove("is-error");
    message.textContent = "Adding you…";

    fetch(api + "/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        return response.text().then(function (body) {
          var reason = (body || "").trim();
          if (response.ok) {
            if (reason === "already-on-list") {
              showDone("You're already on the list", "Nothing more to do — I'll email you when it ships.");
            } else {
              showDone(
                box.getAttribute("data-done-title") || "You're on the list",
                box.getAttribute("data-done-text") || "Check your inbox to confirm."
              );
            }
            return;
          }
          if (reason === "email") email.classList.add("is-invalid");
          fail(MESSAGES[reason] || "Something went wrong. Please try again in a moment.");
        });
      })
      .catch(function () {
        fail("Couldn't reach the server. Please try again in a moment.");
      });
  });
})();
