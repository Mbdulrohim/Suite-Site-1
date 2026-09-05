import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { CallToAction, PageShell, Panel, Section, useSignUp } from './Shell.tsx';

const BASIC_FEATURE_DESCRIPTIONS: Record<string, string> = {
  '1 shop': 'Full cloud license and dedicated ledger for a single physical store or retail location.',
  'IMEI tracking': 'Track every phone, laptop, and device by unique IMEI or serial number from intake to sale.',
  'Invoicing & receipts': 'Generate branded counter receipts, printable invoices, waybills, and instant WhatsApp receipts.',
  'Debts & payables': 'Keep clear, tamper-proof ledgers of customer debts, repayment schedules, and supplier payables.',
  'Trade-in tracking': 'Record device swaps and customer trade-ins with verified valuations and serial matching.',
  'Reports & accounting': 'Daily sales summaries, end-of-day cash reconciliation, gross profit calculation, and expense tracking.',
  'Unlimited staff': 'Create independent logins with individual permissions for all your sales reps and cashier staff at no extra cost.',
};

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
    name: 'Basic Plan',
    monthly: 25000,
    yearly: 15000,
    off: '40%',
    who: '1 shop.',
    has: [
      '1 shop',
      'IMEI tracking',
      'Invoicing & receipts',
      'Debts & payables',
      'Trade-in tracking',
      'Reports & accounting',
      'Unlimited staff',
    ],
  },
  {
    name: 'Standard Plan',
    monthly: 55000,
    yearly: 35000,
    off: '36%',
    who: '2–5 shops.',
    feature: true,
    has: [
      '2–5 shops',
      'Everything in Basic',
      'Stock transfers',
      'Multi-branch sync',
      'Online storefront',
      'Daily close reports',
      'Unlimited staff',
    ],
  },
  {
    name: 'Enterprise Plan',
    who: '5+ shops.',
    has: [
      '5+ shops',
      'Everything in Standard',
      'Dedicated manager & SLA',
    ],
  },
];

const naira = (value: number) => `₦${value.toLocaleString('en-NG')}`;

export const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const openSignUp = useSignUp();

  // Close info tooltip when clicking/tapping away on mobile or desktop
  useEffect(() => {
    if (!activeInfo) return;
    const handleClickAway = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest?.('[data-info-popover]')) {
        setActiveInfo(null);
      }
    };
    document.addEventListener('pointerdown', handleClickAway);
    return () => document.removeEventListener('pointerdown', handleClickAway);
  }, [activeInfo]);

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
        <Panel key={tier.name} className={`p-7 sm:p-9 flex flex-col justify-between ${tier.feature === true ? 'bg-white shadow-sm' : ''}`}>
          <div>
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
              {tier.has.map((line, idx) => {
                const isBasic = tier.name === 'Basic Plan';
                const desc = BASIC_FEATURE_DESCRIPTIONS[line];
                const isPopoverOpen = (hoveredInfo === line) || (activeInfo === line);

                if (isBasic && desc) {
                  return (
                    <li
                      key={idx}
                      data-info-popover
                      className="relative flex items-center text-[14px] leading-[1.55] text-gray-600"
                      onMouseEnter={() => setHoveredInfo(line)}
                      onMouseLeave={() => setHoveredInfo(null)}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveInfo((prev) => (prev === line ? null : line));
                        }}
                        className="inline-flex items-center gap-2 cursor-pointer group text-left focus:outline-none select-none py-0.5"
                        aria-expanded={isPopoverOpen}
                      >
                        <span className="group-hover:text-[#121316] transition-colors">{line}</span>
                        <span className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 group-hover:border-gray-500 group-hover:text-gray-700 flex items-center justify-center text-[10px] font-serif italic transition-colors shrink-0">
                          i
                        </span>
                      </button>

                      {/* Tooltip / Small Modal */}
                      {isPopoverOpen && (
                        <div
                          data-info-popover
                          className="absolute left-0 bottom-full mb-2.5 z-50 w-[260px] sm:w-[280px] p-3.5 bg-white text-[#121316] rounded-2xl shadow-xl border border-gray-200/90 text-left pointer-events-auto select-text animate-in fade-in zoom-in-95 duration-150"
                          role="tooltip"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[12.5px] font-semibold text-[#121316] tracking-tight">{line}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveInfo(null);
                                setHoveredInfo(null);
                              }}
                              className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full cursor-pointer transition-colors"
                              aria-label="Close"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-[12px] leading-relaxed text-[#555861] font-normal">
                            {desc}
                          </p>
                          {/* Downward pointing arrow */}
                          <div className="absolute top-full left-6 -mt-[1px] w-2.5 h-2.5 bg-white border-b border-r border-gray-200/90 transform rotate-45" />
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={idx} className="flex gap-2.5 text-[14px] leading-[1.55] text-gray-600">
                    <Check className="w-4 h-4 mt-[2px] shrink-0 text-blue-500" />
                    <span>{line}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <button
              type="button"
              onClick={openSignUp}
              className={tier.monthly === undefined
                ? "w-full inline-flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-[#121316] text-[13.5px] font-medium tracking-tight px-6 py-2.5 transition-colors cursor-pointer"
                : "w-full inline-flex items-center justify-center rounded-full bg-[#121316] hover:bg-black text-[#FAF9F6] text-[13.5px] font-medium tracking-tight px-6 py-2.5 transition-colors cursor-pointer"
              }
            >
              {tier.monthly === undefined ? "Tell us about your group" : "Start today, free"}
            </button>
          </div>
        </Panel>
      ))}
    </div>

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
};
