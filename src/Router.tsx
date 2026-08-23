/**
 * Routing, kept to the smallest thing that lets the site have pages.
 *
 * There is no client-side router library here on purpose. Every route is
 * prerendered to its own HTML file at build time, so a visitor's first paint is
 * already the right page and a crawler that runs no JavaScript sees all of it.
 * What this needs to do is pick the right component for a path — once on the
 * server, once on hydration — and nothing else.
 *
 * Links between pages are ordinary anchors. A full navigation costs a request
 * the CDN answers from cache, and it keeps every page independently correct
 * rather than depending on a history stack that a crawler will never build.
 */
import type { ReactElement } from 'react';
import Home from './Home.tsx';
import { Pricing } from './pages/Pricing.tsx';
import { ImeiStockTracking } from './pages/ImeiStockTracking.tsx';
import { CustomerDebt } from './pages/CustomerDebt.tsx';

const PAGES: Record<string, () => ReactElement> = {
  '/': Home,
  '/pricing': Pricing,
  '/imei-stock-tracking': ImeiStockTracking,
  '/customer-debt-tracking': CustomerDebt,
};

/** Trailing slashes are the same page, so /pricing/ never 404s or duplicates. */
export const normalise = (path: string): string => {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

export const Router = ({ path }: { path: string }): ReactElement => {
  const Page = PAGES[normalise(path)] ?? Home;
  return <Page />;
};
