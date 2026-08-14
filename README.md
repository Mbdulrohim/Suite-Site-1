# suite.ng

The holding page for **Suite**, so the apex resolves to something while the
real site is designed.

Static by choice: one HTML file, one stylesheet, no JavaScript and no build
step. That is what lets it carry a `default-src 'none'` content-security
policy, paint without a single layout shift, and be read in full by crawlers
that execute no JavaScript — which is the whole job of a page like this.

## What is in it

| | |
| --- | --- |
| `public/index.html` | The page. Metadata, Open Graph, Twitter card, JSON-LD. |
| `public/styles.css` | Two colour tokens, light and dark. |
| `public/llms.txt` | Plain-prose summary for AI search and assistants. |
| `public/sitemap.xml` · `robots.txt` | Indexable, unlike the app. |
| `public/_headers` | CSP, HSTS, referrer and permissions policy. |
| `public/_redirects` | `www` → apex, so the canonical tag tells the truth. |

Icons and `og.png` are copied from the Suite app so the mark and share card
stay identical across `suite.ng` and `app.suite.ng`.

## Deploying

Cloudflare Pages, project `suite-ng`, output directory `public`, **no build
command**. Then point the apex and `www` at it.

## Before it goes live

- `hello@suite.ng` has to exist. Cloudflare Email Routing forwards it to a real
  inbox in a couple of minutes. Remove the two links in `index.html` and
  `llms.txt` instead if it is not wanted yet.
- Plan prices are published on the page and in the JSON-LD `offers`. Delete the
  Plans section and that block if they should stay private for now.

## When the designer's site lands

Replace `public/` wholesale, but carry these across: the JSON-LD graph, the
`llms.txt`, `robots.txt`, `sitemap.xml`, `_headers` and `_redirects`. They are
the parts that took the thinking, and they are the parts a design pass tends to
drop.
