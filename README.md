# Suite — marketing site

The public site at [suite.ng](https://suite.ng). Suite is point-of-sale and
stock control for phone shops, and a product of Copper Ledger LTD.

This repository is the marketing site only. The application lives at
`app.suite.ng`, and the internal console at `admin.copperledgerhq.com` — both
are separate deployments on separate registrable domains.

## Stack

Vite 6 · React 19 · Tailwind CSS v4 · GSAP · lucide-react · TypeScript.
Package manager is **pnpm**.

No router: it is one page, with in-page section navigation.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # vite build → prerender → seo
pnpm preview      # serve dist/ locally
pnpm lint         # tsc --noEmit
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

The `suite-ng` Pages project is connected to **`Mbdulrohim/Suite-Site-1`** —
pushes to `main` there are what goes live. `Mbdulrohim/Suite-Site` holds the
same history (it was the holding page this replaced) but does not deploy.

## Known gaps

- The footer links **Security**, **Terms of service** and **Privacy policy**
  call `preventDefault()` with no handler — they render but go nowhere. They
  need real pages or should come out.
- **Careers** in the footer opens the sign-up modal rather than anything about
  jobs.
- Fonts load from Google Fonts over the network. Self-hosting them via
  `@fontsource` would remove a render-blocking third-party request.
