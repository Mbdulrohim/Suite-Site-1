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

## The build has three steps, and the last two matter

`pnpm build` runs:

1. **`vite build`** — bundles into `dist/`.
2. **`scripts/prerender.mjs`** — loads each route in headless Chrome, scrolls it
   so the scroll-triggered sections mount, and writes the rendered HTML back to
   `dist/`. Without this a crawler receives an empty `<div id="root">`; the
   copy on this page is the entire reason the site exists, so it has to be in
   the markup. It prints the character count of text it captured — if that
   number collapses, something stopped rendering.
3. **`scripts/seo.mjs`** — generates `sitemap.xml`, `robots.txt` and `llms.txt`
   into `dist/`. Generated rather than hand-kept so they cannot drift.

Prerendering needs Chrome. It looks in the default macOS location and can be
pointed elsewhere with `CHROME_PATH`. If Chrome is absent the step logs a
warning and skips, so CI without a browser still produces a build — but that
build is **not** the one to deploy.

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

The Pages project builds from this repository. Confirm which GitHub repository
the `suite-ng` project is connected to before assuming a push here goes live.

## Known gaps

- The footer links **Security**, **Terms of service** and **Privacy policy**
  call `preventDefault()` with no handler — they render but go nowhere. They
  need real pages or should come out.
- **Careers** in the footer opens the sign-up modal rather than anything about
  jobs.
- Fonts load from Google Fonts over the network. Self-hosting them via
  `@fontsource` would remove a render-blocking third-party request.
