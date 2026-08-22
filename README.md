# Suite — marketing site

The public site at [suite.ng](https://suite.ng). Suite is point-of-sale and
stock control for phone shops, and a product of Copper Ledger LTD.

This repository is the marketing site only. The application lives at
`app.suite.ng`, and the internal console at `admin.copperledgerhq.com` — both
are separate deployments on separate registrable domains.

## Stack

Vite 6 · React 19 · Tailwind CSS v4 · GSAP · lucide-react · TypeScript.
Package manager is **pnpm**.

No router: the marketing site is one page, with in-page section navigation. The
one dynamic route is `suite.ng/<slug>`, served by a Cloudflare Pages Function —
see below.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # vite build → prerender → seo
pnpm preview      # serve dist/ locally
pnpm lint         # tsc --noEmit
pnpm test         # node:test, no runner — covers the public profile page
```

## The build has four steps, and the last two matter

`pnpm build` runs:

1. **`vite build`** — the browser bundle, into `dist/`.
2. **`vite build --ssr src/entry-server.tsx`** — the same `<App />` compiled for
   Node, into `dist-ssr/` (git-ignored, a build artifact).
3. **`scripts/prerender.mjs`** — imports that bundle, renders it with
   `react-dom/server`, and injects the markup into `dist/index.html`. Without
   this a crawler receives an empty `<div id="root">`; the copy on this page is
   the entire reason the site exists, so it has to be in the markup. It prints
   the character count of readable text — if that number collapses, something
   stopped rendering.
4. **`scripts/seo.mjs`** — generates `sitemap.xml`, `robots.txt` and `llms.txt`
   into `dist/`. Generated rather than hand-kept so they cannot drift.

This step used to drive a real Chrome through puppeteer. That worked on a Mac
and silently did nothing on Cloudflare's build image, which has no browser — so
every deploy shipped the empty shell while the local build looked fine. A
server render needs no browser, behaves the same in both places, and fails the
build loudly instead of skipping.

The one rule that keeps it working: **nothing in the tree may touch `window` or
`document` while rendering.** Effects and event handlers are fine — they do not
run on the server. `src/main.tsx` uses `hydrateRoot`, so the client adopts this
markup rather than repainting it; a mismatch shows up as a console error on
first load.

Verify before shipping:

```bash
pnpm build && grep -c "hero-headline" dist/index.html
```

A `0` means the page went out as an empty shell.

## Content and metadata

`src/content/site.ts` holds the name, URLs, title, description, and the JSON-LD
graph — one source of truth for anything a crawler or a person reads. The head
tags themselves live in `index.html` since there is a single route.

Kept in step deliberately:

- Title 30–60 characters, description 110–160
- Canonical, Open Graph (with a real 1200×630 `og.png`) and Twitter tags
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`
- `llms.txt` — the plain-prose summary for AI search

`public/_headers` and `public/_redirects` are Cloudflare Pages configuration and
ship as-is.

## Deployment

Cloudflare Pages, configured by `wrangler.toml`:

```toml
name = "suite-ng"
pages_build_output_dir = "dist"
```

The Pages project is **`suite-site`** — it serves `suite.ng` and `www.suite.ng`.
It is connected to **`Mbdulrohim/Suite-Site-1`**, and pushes to `main` there are
what goes live. `Mbdulrohim/Suite-Site` holds the same history (it was the
holding page this replaced) but does not deploy.

Two traps in that sentence, both of which have already cost time:

- **`git push` alone pushes to the mirror**, because `main` tracks `mirror/main`
  — the remote that does *not* deploy. Push to `origin` explicitly.
- **`wrangler.toml` said `name = "suite-ng"`** for a while, which is not a
  project on this account. Every project-scoped wrangler command failed against
  it with "Project not found".

## `suite.ng/<slug>` — a shop's public page

Every Suite shop can publish a page at its own address on this domain:
`suite.ng/ade-gadgets`. It is the shop's web presence if it has no site, and a
stable business card pointing at its site if it does. The address goes on the
shop's receipts, so it has to keep working long after the paper is printed.

Three files:

| File | Job |
| --- | --- |
| `functions/[slug].ts` | Routing, fetch, cache, headers. A Pages Function. |
| `src/public-profile/render.ts` | The document, as a string. Pure, no I/O. |
| `test/*.test.ts` | Both of the above, run with `pnpm test`. |
| `public/404.html` | Makes an unknown path answer 404 and mean it. |

The data comes from `GET https://api.suite.ng/public/profiles/<slug>`, which is
the only route on that API reached with no session and no tenant header. Point
it elsewhere with a `SUITE_API_URL` environment variable on the Pages project.

Three things about this are easy to undo by accident:

- **The API is asked before the asset server, and that order is load-bearing.**
  `[slug]` matches every single-segment path — `/pricing` and `/sitemap.xml`
  included — so the Function has to decide what a path means. The natural
  ordering is assets first, treating a 404 as "unclaimed". That shipped, and it
  served the marketing homepage for every shop on the platform, because **Pages
  answers an unknown path with `index.html` and a 200, not a 404.** Asking the
  API first means a published page renders whatever the asset server does. Only
  when the API says no does the Function fall through to `next()`, so a
  marketing page added later still wins its own path. Nothing here keeps a
  reserved-path list: the database already refuses to publish a profile under
  one.
- **The page loads nothing over the network** — no script, no webfont, no remote
  image. It is one request that renders complete on first byte, which is a
  deliberate trade against matching this site's typeface: it is read on the
  connection somebody has while standing in a market. That is also why its CSP
  can be `default-src 'none'`, which `public/_headers` cannot be. Function
  responses do not inherit `_headers` at all, so the Function sets its own.
- **Everything on the page is text a shop typed.** It is escaped on the way into
  the document, into attributes, and into the JSON-LD block — where `<` alone
  ends the script early. Links are checked for being http or https at the sink
  as well as at the API, because rows written before that check existed were
  never revalidated.

A shop that renames gets a 301 from the API, which this turns into a 301 to the
new public path. A profile with nothing filled in still answers at its URL —
a receipt may already carry it — but asks not to be indexed, so the domain does
not fill up with pages that say only a name.

## Known gaps

- The footer links **Security**, **Terms of service** and **Privacy policy**
  call `preventDefault()` with no handler — they render but go nowhere. They
  need real pages or should come out.
- **Careers** in the footer opens the sign-up modal rather than anything about
  jobs.
- Fonts load from Google Fonts over the network. Self-hosting them via
  `@fontsource` would remove a render-blocking third-party request.
- `HugeSuiteWatermark` hotlinks its photo texture from `images.unsplash.com`.
  A decorative element on the critical path of a third party we do not control:
  if that URL changes, the section silently renders empty. It should be
  downloaded, converted to WebP and served from `public/`. `public/_headers`
  allows the host only because of this.
- The public sitemap lists only `/`. Published shop pages are not in it yet:
  that needs an endpoint on the API listing published slugs, which does not
  exist. Until then those pages are found by their printed address, not by
  crawl.
- Cloudflare injects its Web Analytics beacon at the edge, which is why
  `static.cloudflareinsights.com` is in `script-src`. Turning Web Analytics off
  for the zone would let both entries come out.
- `robots.txt` is **not** what `scripts/seo.mjs` generates. Cloudflare's Managed
  robots.txt / AI Content Signals prepends its own block, which sets
  `ai-train=no` and `Disallow: /` for ClaudeBot, GPTBot, Google-Extended,
  Applebot-Extended, CCBot, Bytespider, meta-externalagent and Amazonbot. That
  works against `llms.txt`. It is a zone setting, not something this repo can
  change.
