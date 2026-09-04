import { useState } from 'react';
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
    name: '1 Shop',
    monthly: 25000,
    yearly: 15000,
    off: '40%',
    who: '1 shop.',
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
    name: '2–5 Shops',
    monthly: 55000,
    yearly: 35000,
    off: '36%',
    who: '2–5 shops.',
    feature: true,
    has: [
      'Up to 5 branches under one account',
      'Stock transfers between your branches',
      'Real-time multi-branch stock visibility',
      'Centralized sales, receipts and waybills',
      'Multi-branch customer credit & debt tracking',
      'Consolidated day close & profit reporting',
      'A public page and online storefront',
    ],
  },
  {
    name: '5 or more shops',
    who: '5 or more shops.',
    /*
     * No figure, because there genuinely is not one — this tier exists for
     * groups and for work built to order. Saying "let us talk" plainly beats
     * inventing a number nobody would honour, and beats leaving the tier off
     * the page and letting a big shop conclude Suite is not for them.
     */
    has: [
      'Custom Workflow Integration',
      'Dedicated Account Manager',
      'Unlimited Team Seats',
      'Custom Audit Logs & SLA',
      '24/7 Priority Support',
    ],
  },
];

const naira = (value: number) => `₦${value.toLocaleString('en-NG')}`;

export const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
  <PageShell
    title={billing === 'monthly' ? '₦25,000 a month.' : '₦180,000 a year.'}
    tail={billing === 'monthly' ? 'Or save 40% when you pay yearly.' : 'That works out to ₦15,000 a month.'}
    standfirst="No card, no setup fee, and nothing charged per person. You pay by bank transfer, the way you already pay for everything else."
  >
    <div className="mx-auto mb-7 flex w-fit rounded-full border border-gray-200 bg-white p-1" aria-label="Billing period">
      {(['monthly', 'yearly'] as const).map((term) => (
        <button
          key={term}
          type="button"
          aria-pressed={billing === term}
          onClick={() => setBilling(term)}
          className={`rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${billing === term ? 'bg-[#121316] text-[#FAF9F6]' : 'text-gray-500 hover:text-[#121316]'}`}
        >
          {term === 'monthly' ? 'Pay monthly' : 'Pay yearly · save up to 40%'}
        </button>
      ))}
    </div>
    <div className="mx-auto max-w-[1140px] grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
      {TIERS.map((tier) => (
        <Panel key={tier.name} className={`p-7 sm:p-9 ${tier.feature === true ? 'bg-white' : ''}`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[15px] font-medium tracking-tight">{tier.name}</h2>
            {/*
              The saving used to be grey text mid-sentence — the lightest
              treatment on the card, on the number we most want read. Paying
              yearly is what is being pushed, so it carries the same dark pill
              the primary button uses. Enterprise has no percentage to show, so
              it says what it is instead of leaving a hole where a badge goes.
            */}
            {tier.off === undefined ? (
              <span className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium tracking-tight text-gray-500">
                Per agreement
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-[#121316] text-[#FAF9F6] px-3 py-1.5 text-[12px] font-medium tracking-tight tabular-nums">
                {billing === 'yearly' ? `Save ${tier.off}` : 'Yearly discount'}
              </span>
            )}
          </div>

          {tier.monthly === undefined || tier.yearly === undefined ? (
            <>
              <p className="mt-6 text-[#121316] font-medium tracking-tight text-[38px] leading-none">
                Let’s talk
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-gray-600">
                Priced on what you actually run
              </p>
              <p className="mt-1.5 text-[13px] text-gray-400">
                Tell us how many shops and we will quote you properly
              </p>
            </>
          ) : (
            <>
              <p className="mt-6 text-[#121316] font-medium tracking-tight text-[38px] leading-none tabular-nums">
                {naira(billing === 'yearly' ? tier.yearly * 12 : tier.monthly)}
                <span className="text-[15px] font-normal text-gray-400 tracking-normal"> /{billing === 'yearly' ? 'year' : 'month'}</span>
              </p>

              <p className="mt-3 text-[15px] leading-[1.5] text-gray-600">
                {billing === 'yearly'
                  ? <><strong className="font-medium text-[#121316] tabular-nums">{naira(tier.yearly)}</strong> a month, billed once yearly</>
                  : <>Switch to yearly and pay <strong className="font-medium text-[#121316] tabular-nums">{naira(tier.yearly)}</strong> a month</>}
              </p>

              <p className="mt-1.5 text-[13px] text-gray-400 tabular-nums">
                {billing === 'yearly' ? `${naira(tier.monthly * 12)} at the monthly rate — you keep ` : 'Yearly total: '}
                <strong className="font-medium text-[#121316]">
                  {billing === 'yearly' ? naira((tier.monthly - tier.yearly) * 12) : naira(tier.yearly * 12)}
                </strong>
              </p>
            </>
          )}

          <p className="mt-5 text-[13px] text-gray-400">{tier.who}</p>

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

    <Section heading="What does Suite cost in Nigeria?">
      <p>
        Suite costs <strong className="font-medium text-[#121316]">₦25,000 a month</strong> for 1
        shop, or ₦15,000 a month if you pay for a year at once — ₦180,000 for the year
        instead of ₦300,000. A business running 2–5 shops pays{' '}
        <strong className="font-medium text-[#121316]">₦55,000 a month</strong>, or ₦35,000 a month
        on the yearly rate. Businesses with 5 or more shops are priced per agreement.
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
};
