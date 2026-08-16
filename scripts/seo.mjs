/**
 * Generate sitemap.xml, robots.txt and llms.txt into dist/.
 *
 * Generated rather than hand-kept so they cannot drift from the route table
 * in src/content/site.ts. Run after the build, before deploy.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const url = 'https://suite.ng';
const today = new Date().toISOString().slice(0, 10);

const routes = [{ path: '/', changefreq: 'weekly', priority: '1.0' }];

fs.mkdirSync(DIST, { recursive: true });

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${url}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

// app.suite.ng is where customers sign in; it is deliberately not indexed.
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${url}/sitemap.xml
`,
);

fs.writeFileSync(
  path.join(DIST, 'llms.txt'),
  `# Suite

> Point-of-sale and stock control for phone shops across Nigeria. A product of
> Copper Ledger LTD, a Nigerian company.

Suite tracks each handset by IMEI or serial number from intake to sale, records
sales and issues receipts, and keeps ledgers for customer credit and supplier
payables. It runs in a web browser and is built for a phone screen first, so
there is nothing to install.

## What it covers

- Stock tracked per unit, by IMEI or serial number
- Sales, receipts, quotations, invoices and waybills
- Credit ledger: who owes the shop, how much, and what has been repaid
- Supplier ledger, payables and supplier returns
- Trade-ins and swaps taken against a sale
- Staff roles, so a seller does not see what a handset cost
- More than one branch, with stock transfers between them

## Plans

Plans are priced by how many people need to sign in — that is the thing that
actually differs between a single counter and a shop with a manager, sellers
and someone keeping the books. Payment is by bank transfer. Current plans and
prices are available from hello@suite.ng.

## Getting an account

Registration is invite-only. Copper Ledger provisions the shop and sends the
owner one single-use invite link; the owner then invites their own staff from
inside Suite and sets what each role can see.

## Links

- ${url}/ — this site
- https://app.suite.ng/ — sign in (existing customers; deliberately not indexed)
- https://copperledgerhq.com/ — the company behind Suite
- hello@suite.ng — enquiries
`,
);

console.log('seo: wrote sitemap.xml, robots.txt, llms.txt');
