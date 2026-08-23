import { Bullets, CallToAction, PageShell, Section } from './Shell.tsx';

/**
 * The price, in naira, on a page.
 *
 * Nigerian software pricing is usually "contact us", which means every trader
 * assumes it is expensive and most never ask. Publishing the number is both the
 * honest thing and the thing that ranks: "how much does shop software cost in
 * Nigeria" is a real query with almost no straight answers in it.
 */
const TIERS = [
  {
    name: 'Standard',
    monthly: '₦25,000',
    yearly: '₦15,000',
    saving: '40% off',
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
    monthly: '₦55,000',
    yearly: '₦35,000',
    saving: '36% off',
    who: 'Up to five locations.',
    has: [
      'Everything in Standard',
      'Up to five branches under one account',
      'Stock transfers between your branches',
      'A public page and online storefront',
    ],
  },
];

export const Pricing = () => (
  <PageShell
    eyebrow="Pricing"
    title="₦25,000 a month. ₦15,000 if you pay for the year."
    standfirst="No card, no setup fee, and no per-user charge. You pay by bank transfer, the way you already pay for everything else."
  >
    <div className="grid gap-5 sm:grid-cols-2">
      {TIERS.map((tier) => (
        <div key={tier.name} className="rounded-2xl border border-[#ECEAE3] bg-white p-6">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.08em]">{tier.name}</h2>
          <p className="mt-3 text-[32px] leading-none font-semibold tabular-nums">
            {tier.monthly}
            <span className="text-[15px] font-normal text-[#9CA3AF]"> /month</span>
          </p>
          <p className="mt-2 text-[14px] text-[#6B7280] tabular-nums">
            or <strong className="font-semibold text-[#121316]">{tier.yearly}</strong> a month
            paid yearly — {tier.saving}
          </p>
          <p className="mt-4 text-[14px] text-[#6B7280]">{tier.who}</p>
          <ul className="mt-5 space-y-2 text-[14px] leading-[1.55] text-[#374151]">
            {tier.has.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span aria-hidden className="mt-[9px] h-[4px] w-[4px] rounded-full bg-[#121316] shrink-0" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <Section heading="What does Suite cost in Nigeria?">
      <p>
        Suite costs <strong>₦25,000 a month</strong> for a single shop, or ₦15,000 a month if you
        pay for a year at once — ₦180,000 for the year instead of ₦300,000. A business running up
        to five locations pays <strong>₦55,000 a month</strong>, or ₦35,000 a month on the yearly
        rate. Larger groups are priced per agreement.
      </p>
      <p>
        There is no charge per staff member. You can give every person at the counter their own
        login on any plan, which matters because the record of who sold what is only worth
        something when nobody is sharing an account.
      </p>
    </Section>

    <Section heading="How do I pay?">
      <p>
        Bank transfer. We record the payment against your shop and tell you when the next one is
        due. There is no card on file and nothing renews without you knowing, because nobody in
        Computer Village wants a subscription that charges itself.
      </p>
    </Section>

    <Section heading="Is there a free trial?">
      <p>
        A shop starts on a two-week trial. Nothing is charged during it, and if it is not for you
        at the end, you stop — your records stay yours and we will export them to you.
      </p>
    </Section>

    <Section heading="What happens if I stop paying?">
      <p>
        Your data is not deleted. The account goes read-only, so you can still open it and look up
        an IMEI, a receipt or who owes you what. Nothing in Suite is ever erased — a shop that
        leaves and comes back a year later finds its books where it left them.
      </p>
    </Section>

    <CallToAction line="Tell us about your shop and we will set it up and move your existing stock in." />
  </PageShell>
);
