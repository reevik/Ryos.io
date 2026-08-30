# Deployment

Pushing to `main` builds the site on GitHub and copies it to the ryos.io vhost.
Nothing is built on the production host, so a broken build can never reach the
live site — the workflow is [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The same server also serves **reevik.net** from a separate vhost. Every path in
the workflow is confined to `/var/www/vhosts/ryos.io/httpdocs`; a deploy here
cannot affect reevik.net.

## One-time GitHub setup

Add one secret under *Settings → Secrets and variables → Actions*:

| Secret | Value |
| --- | --- |
| `DEPLOY_SSH_KEY` | contents of `~/.ssh/reevik_deploy_ed25519` (the **private** half) |

Copy it to the clipboard without printing it:

```sh
pbcopy < ~/.ssh/reevik_deploy_ed25519
```

That is the only secret needed. The matching public key is **already** in
`/root/.ssh/authorized_keys` on the server, commented
`github-actions-deploy@reevik.net` — the same key the blog repo deploys with, so
no server-side setup is required for this repo.

The server's *host* keys are public, so they live in the repo at
`.github/known_hosts`; the connection is pinned with no trust-on-first-use. If
the server is ever rebuilt, refresh that file:

```sh
ssh-keyscan -t rsa,ecdsa,ed25519 reevik.net | grep -v '^#' | sort > .github/known_hosts
```

## Ruby version

CI builds on **3.2**, matching the `RUBY_VERSION` the theme shipped in its
`netlify.toml`.

This repo has none of the Ruby-3.1 constraint that pins the sibling blog repo.
That one is stuck on 3.1 because Jekyll 3.10 pins `liquid 4.0.1`, which calls the
`Object#tainted?` that Ruby 3.2 removed. Serif runs Jekyll 4.4 / liquid 4.0.4,
which dropped taint checking altogether.

Note that `Gemfile.lock` is git-ignored, so CI resolves gems fresh on every run
rather than building from a pinned set. Fine for a three-gem Gemfile; commit the
lockfile if you ever want reproducible builds.

## What a deploy does

1. Builds with `JEKYLL_ENV=production`.
2. Refuses to continue if the build produced no `index.html`, or fewer than 15
   pages — a Jekyll build can technically succeed and emit almost nothing, and
   copying that over a working site is how a site goes blank. The site builds 20
   pages today.
3. `rsync`s `_site/` into `/var/www/vhosts/ryos.io/httpdocs/`.
4. Hands ownership back to `ryos.io_w9c7h49jos:psacln`, since rsync runs as root.
5. Curls five live URLs and fails the run if any of them isn't a 200.

## Two details worth keeping

**`--delete` is used here, deliberately** — unlike the reevik.net docroot, which
also holds an API and other projects and therefore must never be mirrored. This
docroot serves nothing but this site, so files that leave the site are removed
rather than lingering. `.well-known/` is excluded so a deploy can never delete an
ACME challenge mid-renewal and break TLS.

**The docroot directory's own ownership is set separately** from its contents.
Plesk creates it as `ryos.io_w9c7h49jos:psaserv` mode `750`, while the contents
want `psacln`. A blanket `chown -R` would quietly flatten that difference, and an
`rsync -a` without `--no-owner --no-group` stamps the *client's* uid onto it —
which is exactly what happened during the first manual deploy, leaving the
docroot owned by a local Mac user until it was reset. Both guards are in the
workflow.

## Security note

`DEPLOY_SSH_KEY` grants **root** over SSH, so anyone who can run a workflow in
this repo effectively has root on the box — a box that also serves reevik.net.
GitHub does not expose secrets to workflows from forked pull requests, so the
practical exposure is anyone with write access to this repo.

Serif is an MIT-licensed free theme, so unlike the blog repo there is no
licensing reason to keep this repository private. If you do make it public,
tighten the deploy path first: either a dedicated non-root user owning only this
docroot, or a `command=`-restricted key in `authorized_keys`.

## Deploying by hand

```sh
bundle exec jekyll build
rsync -az --delete --exclude '.well-known/' --no-owner --no-group \
  --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  -e "ssh -i ~/.ssh/reevik_deploy_ed25519" \
  _site/ root@reevik.net:/var/www/vhosts/ryos.io/httpdocs/
```
