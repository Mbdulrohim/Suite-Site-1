import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

export interface PricingSectionProps {
  onOpenSignUp: () => void;
}

const BASIC_FEATURE_DESCRIPTIONS: Record<string, string> = {
  '1 shop': 'Full cloud license and dedicated ledger for a single physical store or retail location.',
  'IMEI tracking': 'Track every phone, laptop, and device by unique IMEI or serial number from intake to sale.',
  'Invoicing & receipts': 'Generate branded counter receipts, printable invoices, waybills, and instant WhatsApp receipts.',
  'Debts & payables': 'Keep clear, tamper-proof ledgers of customer debts, repayment schedules, and supplier payables.',
  'Trade-in tracking': 'Record device swaps and customer trade-ins with verified valuations and serial matching.',
  'Reports & accounting': 'Daily sales summaries, end-of-day cash reconciliation, gross profit calculation, and expense tracking.',
  'Unlimited staff': 'Create independent logins with individual permissions for all your sales reps and cashier staff at no extra cost.',
};

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenSignUp }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // On mobile, scroll carousel so the popular card (index 1) is centred by default
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // Only apply on mobile (md breakpoint = 768px)
    if (window.innerWidth >= 768) return;
    // Each card is 84vw wide + 24px gap
    const cardWidth = el.scrollWidth / 3;
    el.scrollLeft = cardWidth;
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      monthlyPrice: '₦25,000',
      yearlyEffectivePrice: '₦15,000',
      isPopular: false,
      isCustom: false,
      ctaText: 'Get Started',
      iconType: 'check',
      features: [
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
      id: 'standard',
      name: 'Standard Plan',
      monthlyPrice: '₦55,000',
      yearlyEffectivePrice: '₦29,166',
      isPopular: true,
      isCustom: false,
      ctaText: 'Get Started',
      iconType: 'green-check',
      features: [
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
      id: 'enterprise',
      name: 'Enterprise Plan',
      monthlyPrice: 'Custom',
      yearlyEffectivePrice: 'Custom',
      isPopular: false,
      isCustom: true,
      description: 'Custom workflows designed around your infrastructure. Trusted by high-volume retail groups.',
      ctaText: 'Contact Team',
      iconType: 'dark-check',
      features: [
        '5+ shops',
        'Everything in Standard',
        'Custom workflows',
        'Unlimited staff',
        'Dedicated manager',
        'Audit logs & SLA',
        '24/7 priority support',
      ],
    },
  ];

  return (
    <section id="pricing" className="w-full py-16 sm:py-24 md:py-32 lg:py-40 select-none overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">

        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-[620px] mx-auto mb-10 sm:mb-16">
          <h2 className="text-[#121316] font-medium tracking-tight text-[34px] sm:text-[44px] md:text-[52px] leading-[1.1] mb-3 font-sans">
            Pricing
          </h2>
          <p className="text-[#666666] text-[15px] sm:text-[17px] font-medium">
            Same amount at checkout!
          </p>

          {/* Billing Cycle Pill Toggle */}
          <div className="relative mt-8 sm:mt-10 inline-flex items-center">
            {/* Green Discount Floating Badge */}
            <div className="absolute -top-3.5 right-1 z-10">
              <span className="bg-[#D8F8E5] text-[#16A34A] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                5 months FREE
              </span>
            </div>

            {/* Toggle Container */}
            <div className="bg-[#EBE9E1] p-1 rounded-full flex items-center gap-1 border border-[#DFDDD5]">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 sm:px-6 py-1.5 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer ${billingCycle === 'monthly'
                  ? 'bg-white text-[#121316] shadow-sm'
                  : 'text-[#666666] hover:text-[#121316]'
                  }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 sm:px-6 py-1.5 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer ${billingCycle === 'yearly'
                  ? 'bg-white text-[#121316] shadow-sm'
                  : 'text-[#666666] hover:text-[#121316]'
                  }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards: 15k, 29.1k, Enterprise */}
        <div className="relative w-full">
          <div ref={carouselRef} className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 md:gap-8 items-end max-w-[1100px] mx-auto px-4 sm:px-6 md:px-0 pb-6 pt-4 -mx-4 sm:-mx-6 md:mx-auto scrollbar-none">
            {plans.map((plan) => {
              const currentPrice = billingCycle === 'yearly' ? plan.yearlyEffectivePrice : plan.monthlyPrice;

              if (plan.isPopular) {
                return (
                  /* Popular Standard Plan (29.1k / 55k) - Taller at top, bottom-aligned */
                  <div
                    key={plan.id}
                    className="w-[84vw] max-w-[340px] md:w-full shrink-0 snap-center relative rounded-[32px] bg-[#444444] p-[2.5px] flex flex-col z-10"
                  >
                    {/* Top 'Popular' header banner */}
                    <div className="py-3 px-6 text-white text-[14px] font-medium tracking-wide text-left">
                      Popular
                    </div>

                    {/* White Inner Card Body */}
                    <div className="bg-white rounded-[29px] p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <div className="text-[15px] sm:text-[16px] font-medium text-[#444444] mb-2 text-left">
                          {plan.name}
                        </div>

                        {/* Price Figure (444444 fill, font-medium) */}
                        <div className="flex items-baseline gap-1 mb-8 text-left">
                          <span className="text-[38px] sm:text-[46px] font-medium text-[#444444] tracking-tight font-sans">
                            {currentPrice}
                          </span>
                          <span className="text-[18px] sm:text-[20px] font-medium text-[#444444]">/m</span>
                        </div>

                        {/* Primary CTA Button */}
                        <button
                          type="button"
                          onClick={onOpenSignUp}
                          className="w-full h-[48px] sm:h-[50px] bg-[#444444] hover:bg-[#333333] text-white text-[15px] font-medium rounded-full flex items-center justify-center transition-all duration-200 active:scale-[0.98] cursor-pointer mb-8"
                        >
                          {plan.ctaText}
                        </button>

                        {/* Feature List (Green Checkmarks) */}
                        <div className="space-y-4 text-left">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-[14px] sm:text-[14.5px] font-medium text-[#444444]">
                              <Check className="w-4 h-4 text-[#22C55E] stroke-[2.5] shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                /* Unfilled / Transparent Cards (Basic 15k & Enterprise Plan) - Bottom-aligned */
                <div
                  key={plan.id}
                  className="w-[84vw] max-w-[340px] md:w-full shrink-0 snap-center bg-transparent p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    {/* Title */}
                    <div className="text-[15px] sm:text-[16px] font-medium text-[#444444] mb-2 text-left">
                      {plan.name}
                    </div>

                    {/* Price Figure / Custom Title */}
                    <div className="flex items-baseline gap-1 mb-8 text-left">
                      <span className="text-[38px] sm:text-[46px] font-medium text-[#444444] tracking-tight font-sans">
                        {currentPrice}
                      </span>
                      {!plan.isCustom && (
                        <span className="text-[18px] sm:text-[20px] font-medium text-[#444444]">/m</span>
                      )}
                    </div>

                    {/* Primary CTA Button */}
                    <button
                      type="button"
                      onClick={onOpenSignUp}
                      className="w-full h-[48px] sm:h-[50px] bg-[#444444] hover:bg-[#333333] text-white text-[15px] font-medium rounded-full flex items-center justify-center transition-all duration-200 active:scale-[0.98] cursor-pointer mb-8"
                    >
                      {plan.ctaText}
                    </button>

                    {/* Enterprise Custom Copy or Feature List */}
                    {plan.isCustom && plan.description && (
                      <p className="text-[13px] sm:text-[13.5px] font-medium text-[#666666] leading-relaxed mb-6 text-left">
                        {plan.description}
                      </p>
                    )}

                    {/* Feature List */}
                    <div className="space-y-4 text-left">
                      {plan.features.map((feature, idx) => {
                        const isBasic = plan.id === 'basic';
                        const desc = BASIC_FEATURE_DESCRIPTIONS[feature];
                        const isPopoverOpen = (hoveredInfo === feature) || (activeInfo === feature);

                        if (isBasic && desc) {
                          return (
                            <div
                              key={idx}
                              data-info-popover
                              className="relative flex items-center text-[14px] sm:text-[14.5px] font-medium text-[#444444]"
                              onMouseEnter={() => setHoveredInfo(feature)}
                              onMouseLeave={() => setHoveredInfo(null)}
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveInfo((prev) => (prev === feature ? null : feature));
                                }}
                                className="inline-flex items-center gap-2 cursor-pointer group text-left focus:outline-none select-none py-0.5"
                                aria-expanded={isPopoverOpen}
                              >
                                <span className="group-hover:text-[#121316] transition-colors">{feature}</span>
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
                                    <span className="text-[12.5px] font-semibold text-[#121316] tracking-tight">{feature}</span>
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
                            </div>
                          );
                        }

                        return (
                          <div key={idx} className="flex items-center gap-3 text-[14px] sm:text-[14.5px] font-medium text-[#444444]">
                            <Check className="w-4 h-4 text-[#444444] stroke-[2.5] shrink-0" />
                            <span>{feature}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
