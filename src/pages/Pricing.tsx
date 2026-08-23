import { Check } from 'lucide-react';
import { CallToAction, PageShell, Panel, Section } from './Shell.tsx';

/**
 * The price, in naira, on a page.
 *
 * Nigerian software pricing is almost always "contact us", which means every
 * trader assumes it is expensive and most never ask. Publishing the number is
 * both the honest thing and the thing that ranks — "how much does shop software
 * cost in Nigeria" is a real query with almost no straight answers in it.
 */
const TIERS = [
  {
    name: 'Standard',
    monthly: 25000,
    yearly: 15000,
    off: '40%',
    who: 'One shop.',
    has: [
      'Every unit tracked by IMEI or serial number',
      'Counter sales, receipts, invoices and waybills',
      'Customer debts, repayments and due dates',
      'Suppliers, payables and landed costs',
      'Trade-ins and swaps',
      'Day close, expenses and reporting',
      'As many staff logins as you need',
    ],
  },
  {
    name: 'Plus',
    monthly: 55000,
    yearly: 35000,
    off: '36%',
    who: 'Up to five locations.',
    feature: true,
    has: [
      'Everything in Standard',
      'Up to five branches under one account',
      'Stock transfers between your branches',
      'A public page and online storefront',
    ],
  },
];

const naira = (value: number) => `₦${value.toLocaleString('en-NG')}`;

export const Pricing = () => (
  <PageShell
    title="₦25,000 a month."
    tail="₦15,000 if you pay for the year."
    standfirst="No card, no setup fee, and nothing charged per person. You pay by bank transfer, the way you already pay for everything else."
  >
    <div className="mx-auto max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
      {TIERS.map((tier) => (
        <Panel key={tier.name} className={`p-7 sm:p-9 ${tier.feature === true ? 'bg-white' : ''}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[15px] font-medium tracking-tight">{tier.name}</h2>
            <span className="text-[13px] text-gray-400">{tier.who}</span>
          </div>

          <p className="mt-6 text-[#121316] font-medium tracking-tight text-[38px] leading-none tabular-nums">
            {naira(tier.monthly)}
            <span className="text-[15px] font-normal text-gray-400 tracking-normal"> /month</span>
          </p>

          <p className="mt-3 text-[14px] text-gray-500 leading-[1.55]">
            or <strong className="font-medium text-[#121316]">{naira(tier.yearly)}</strong> a month
            paid yearly — <span className="text-gray-400">{tier.off} off</span>
          </p>

          <ul className="mt-7 space-y-2.5">
            {tier.has.map((line) => (
              <li key={line} className="flex gap-2.5 text-[14px] leading-[1.55] text-gray-600">
                <Check className="w-4 h-4 mt-[2px] shrink-0 text-blue-500" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Panel>
      ))}
    </div>

    <p className="mx-auto max-w-[900px] mt-5 text-center text-[14px] text-gray-400">
      More than five locations, or something built to order — we price that per agreement.
    </p>

    <Section heading="What does Suite cost in Nigeria?">
      <p>
        Suite costs <strong className="font-medium text-[#121316]">₦25,000 a month</strong> for a
        single shop, or ₦15,000 a month if you pay for a year at once — ₦180,000 for the year
        instead of ₦300,000. A business running up to five locations pays{' '}
        <strong className="font-medium text-[#121316]">₦55,000 a month</strong>, or ₦35,000 a month
        on the yearly rate. Larger groups are priced per agreement.
      </p>
      <p>
        Nothing is charged per staff member. Everyone at the counter can have their own login on
        any plan, which matters because a record of who sold what is worth nothing when four people
        share one account.
      </p>
    </Section>

    <Section heading="How do I pay?">
      <p>
        Bank transfer. We record the payment against your shop and tell you when the next one is
        due. There is no card on file and nothing renews by itself, because nobody here wants a
        subscription that charges itself.
      </p>
    </Section>

    <Section heading="Is there a free trial?">
      <p>
        A shop starts on a two-week trial. Nothing is charged during it, and if it is not for you
        at the end you simply stop — the records stay yours and we will export them to you.
      </p>
    </Section>

    <Section heading="What happens if I stop paying?">
      <p>
        Your data is not deleted. The account goes read-only, so you can still open it and look up
        an IMEI, a receipt, or who owes you what. Nothing in Suite is ever erased — a shop that
        leaves and comes back a year later finds its books where it left them.
      </p>
    </Section>

    <CallToAction line="Tell us about your shop and we will set it up and move your stock in." />
  </PageShell>
);
