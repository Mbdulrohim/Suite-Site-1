/**
 * Every string a crawler or a human reads, in one place.
 *
 * The build scripts (`scripts/seo.mjs`) generate sitemap.xml, robots.txt and
 * llms.txt from this file, so those can never drift from what the site
 * actually says. Change a fact here, not in three files.
 */

export const site = {
  name: 'Suite',
  url: 'https://suite.ng',
  appUrl: 'https://app.suite.ng',
  email: 'hello@suite.ng',
  company: 'Copper Ledger LTD',
  companyUrl: 'https://copperledgerhq.com',

  /** 30–60 chars. */
  title: 'Suite — stock and sales for phone shops',
  /** 110–160 chars, a real sentence. */
  description:
    'Suite tracks every handset by IMEI from intake to sale, records sales and receipts, and keeps credit and supplier ledgers. Built for Nigerian phone shops.',

  ogImage: '/og.png',
  author: { name: 'mbdulrohim', url: 'https://mbdulrohim.dev' },
} as const;

export const routes = [
  {
    path: '/',
    title: site.title,
    description: site.description,
    changefreq: 'weekly',
    priority: 1.0,
  },
] as const;

/**
 * Organization + WebSite + SoftwareApplication, the density that gets a site
 * quoted rather than merely indexed.
 */
export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#org`,
      name: site.company,
      url: site.companyUrl,
      email: site.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#site`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${site.url}/#org` },
      author: { '@type': 'Person', name: site.author.name, url: site.author.url },
    },
    {
      '@type': 'SoftwareApplication',
      name: site.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Point-of-sale and stock control for phone shops. Tracks handsets per unit by IMEI, records sales and receipts, and keeps customer credit and supplier ledgers.',
      publisher: { '@id': `${site.url}/#org` },
      offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock' },
    },
  ],
};
