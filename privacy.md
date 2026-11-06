---
layout: holding
title: Privacy · ryos.io
description: What ryos.io and app.ryos.io record about you, why, for how long, and how to have it removed.
permalink: /privacy/
---

<a href="{{ '/' | relative_url }}"><img class="logo" src="{{ '/images/logo/ryos-lockup.png' | relative_url }}" alt="ryos" width="120" height="107" style="width:120px"></a>

<div class="prose" markdown="1">

# Privacy Policy

*Last updated: 6 November 2026*

This page covers **ryos.io** (this website) and **app.ryos.io** (accounts,
subscriptions, licensing for the desktop apps, and Mergen). It is written for
the EU General Data Protection Regulation (GDPR) and the German
Telecommunications Digital Services Data Protection Act (TDDDG).

## Who is responsible

Erhan Bağdemir is the controller for the processing described here. Write to
[erhan@reevik.net](mailto:erhan@reevik.net) about anything on this page. See
also the [Impressum]({{ '/impressum/' | relative_url }}).

## Short version

- **ryos.io** sets no cookies, uses no analytics and loads nothing from
  third parties.
- **app.ryos.io** sets one cookie, the login session, and nothing else. It
  uses no analytics and no third-party services. Its font is served from
  app.ryos.io itself.
- **Server logs** hold your IP address for **14 days**, then they are deleted
  automatically.
- **Deleting your account** erases your data everywhere in the app (details
  below).

## Hosting and server logs

Both sites, their database and their mail server run on a server rented from
STRATO GmbH, Otto-Ostrowski-Straße 7, 10249 Berlin, Germany, which acts as
processor under a data processing agreement (Art. 28 GDPR). The data stays in
Germany.

When your browser makes a request, the web server records your **IP
address**, the date and time, the requested address, the HTTP status and size
of the response, the referring page and your browser's user-agent string.
Error logs can hold the IP address and the request too. The server needs these
records to deliver the service and to find faults and fend off attacks
(Art. 6(1)(f) GDPR, legitimate interest in a secure, working service).

**Retention:** log files are deleted or trimmed automatically after
**14 days**. Log entries from an actual attack may be kept longer, for as long
as dealing with that incident needs. They are kept apart from the regular logs
and only the operator can read them.

## Your account

To create an account on app.ryos.io you give your **email address**, a
**password** and a **billing address** (name, street, postal code, city,
country). The password is stored only as a one-way hash, so nobody can read
it, not even the operator. The app also stores when the account was created,
whether you have confirmed your email address (it sends one confirmation
email), and the status of your subscriptions.

**Legal basis:** Art. 6(1)(b) GDPR, because the data is needed to provide the
account and the subscriptions you ask for.

**Payments:** no payment provider is connected yet, and the app collects no
card or bank details. This section will name the provider before payments go
live.

**Sign-in protection:** after repeated failed sign-ins, the app blocks the
account for 15 minutes. It counts the failures in memory only and does not
write them to disk (Art. 6(1)(f) GDPR, protecting your account).

## The login cookie

When you sign in, app.ryos.io sets one cookie, `JSESSIONID`, for the domain
ryos.io. It holds a random session identifier that keeps you signed in, and
it protects your forms against cross-site request forgery. It expires when
the session ends or you close your browser. Because the service cannot work
without it, it needs no consent (§ 25(2) no. 2 TDDDG). The app uses no other
cookies and no tracking of any kind.

## Desktop apps and licensing

When you sign in to a ryos desktop app such as Proscenium, the app goes
through app.ryos.io (OAuth) and receives a **license token**. The server
stores a hash of that token, together with your email address, the product,
a device label sent by the app (for example your computer's name), and when
the token was created, last used and expires. This lets the app check your
license (Art. 6(1)(b) GDPR). Tokens are deleted with your account.

## Mergen

In Mergen you can create organisations, teams, boards and tickets, and add
or invite people. Mergen stores:

- for your organisations: their name and owner, members (**name, email
  address, role**), teams, boards, tickets, comments and labels;
- for invitations: the invited **email address**, who invited them, the
  organisation and role, the status, and when the invitation was sent and
  answered. An invitation can be accepted for 14 days.

When you invite someone, app.ryos.io sends them **one email** with the
invitation, on your behalf. Only add or invite people who would expect it.
Anyone can ask us to remove their address (see *Your rights*).

**Legal basis:** Art. 6(1)(b) GDPR for your own data. For the people you add
or invite, it is Art. 6(1)(f) GDPR: the legitimate interest in letting teams
work together.

## Deleting your account

You can delete your account yourself under **Account** on app.ryos.io. This
removes, at once:

- your account, billing address and subscriptions;
- your license tokens;
- the Mergen organisations you own, with everything in them;
- your personal boards, and invitations sent to you or by you.

In organisations owned by someone else, your membership ends, tickets
assigned to you become unassigned, and your email address is removed from the
tickets you reported and the comments you wrote. The text of those tickets
and comments stays, because it belongs to that organisation's work.

Once paid subscriptions exist, invoices will have to be kept for the periods German
tax law requires, even after an account is deleted.

## Abuse protection

Sign-in, registration, confirmation emails and license checks are rate
limited, so that nobody can guess passwords or use the service to flood
someone's inbox. For this the server counts requests per IP address (and,
for emails, per recipient address) in memory only, for at most an hour. It
refuses further requests above a small limit, then discards the counters.
Nothing is written to disk (Art. 6(1)(f) GDPR, legitimate interest in
protecting the service, its users and third parties).

## Newsletter and waitlist

The ryos.io newsletter and the product waitlists are not open at the moment.
This page will describe them before they open.

## Your rights

Under the GDPR you have the right to:

- access the data stored about you (Art. 15) and receive a copy (Art. 20),
- have it corrected (Art. 16), deleted (Art. 17) or its use restricted (Art. 18),
- object to processing based on legitimate interest (Art. 21),
- withdraw any consent at any time, with effect for the future (Art. 7(3)).

Email [erhan@reevik.net](mailto:erhan@reevik.net) to use any of these rights.

You also have the right to complain to a data protection supervisory
authority (Art. 77 GDPR). The authority responsible for ryos.io is the
Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD),
[www.datenschutzzentrum.de](https://www.datenschutzzentrum.de/).

No decision about you is made by automated means, and no profile of you is
built.

## Changes

This policy changes when the service does. The date at the top shows the
latest version.

</div>
