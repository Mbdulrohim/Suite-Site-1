import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

export interface PricingSectionProps {
  onOpenSignUp: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenSignUp }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const carouselRef = useRef<HTMLDivElement>(null);

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
      id: '1-shop',
      name: '1 Shop',
      monthlyPrice: '₦25,000',
      yearlyEffectivePrice: '₦15,000',
      isPopular: false,
      isCustom: false,
      ctaText: 'Get Started',
      iconType: 'check',
      features: [
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
      id: '2-5-shops',
      name: '2–5 Shops',
      monthlyPrice: '₦55,000',
      yearlyEffectivePrice: '₦35,000',
      isPopular: true,
      isCustom: false,
      ctaText: 'Get Started',
      iconType: 'green-check',
      features: [
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
      id: 'enterprise',
      name: '5 or more shops',
      monthlyPrice: 'Custom',
      yearlyEffectivePrice: 'Custom',
      isPopular: false,
      isCustom: true,
      description: 'Custom workflows designed around your infrastructure. Trusted by teams like Joshville.',
      ctaText: 'Contact Team',
      iconType: 'dark-check',
      features: [
        'Custom Workflow Integration',
        'Dedicated Account Manager',
        'Unlimited Team Seats',
        'Custom Audit Logs & SLA',
        '24/7 Priority Support',
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
                Save up to 40%
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
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[14px] sm:text-[14.5px] font-medium text-[#444444]">
                          {plan.iconType === 'info' ? (
                            <span className="inline-flex items-center gap-2">
                              <span>{feature}</span>
                              <span className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-medium">
                                !
                              </span>
                            </span>
                          ) : (
                            <>
                              <Check className="w-4 h-4 text-[#444444] stroke-[2.5] shrink-0" />
                              <span>{feature}</span>
                            </>
                          )}
                        </div>
                      ))}
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
