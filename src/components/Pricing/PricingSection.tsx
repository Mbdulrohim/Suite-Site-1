import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export interface PricingSectionProps {
  onOpenSignUp: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenSignUp }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      badgeName: 'Basic Plan',
      headline: 'For individuals & small shops testing the waters.',
      monthlyPrice: '₦7,500',
      yearlyEffectivePrice: '₦3,750',
      yearlyBilledAmount: '₦45,000',
      discountNote: '50% off',
      isPopular: false,
      features: [
        'Up to 20 orders per month',
        'Basic activity tracking',
        'Single-user access',
        'Standard email support',
        'Basic export options',
      ],
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      badgeName: 'Standard Plan',
      headline: 'For growing teams needing scalable, custom workflows.',
      monthlyPrice: '₦25,000',
      yearlyEffectivePrice: '₦15,000',
      yearlyBilledAmount: '₦180,000',
      discountNote: '40% off',
      isPopular: true,
      features: [
        'Choose up to 20 custom services / modules',
        'Up to 250 managed orders per month',
        'Multi-user collaboration (up to 3 seats)',
        'Activity & order history archive',
        'Priority support with 24-hour turnaround',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      badgeName: 'Premium Plan',
      headline: 'Complete, unrestricted access for scaling operations.',
      monthlyPrice: '₦55,000',
      yearlyEffectivePrice: '₦29,166',
      yearlyBilledAmount: '₦350,000',
      discountNote: '~47% off',
      isPopular: false,
      features: [
        'Unlimited service access & orders',
        'Unlimited team seats & permissions',
        'Real-time activity logs & custom audit reports',
        'Dedicated integration support',
        '24/7 direct phone & chat support',
      ],
    },
  ];

  return (
    <section id="pricing" className="w-full py-16 sm:py-24 md:py-32 lg:py-40 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-[620px] mx-auto mb-10 sm:mb-14">
          <h2 className="text-[#121316] font-medium tracking-tight text-[32px] sm:text-[42px] md:text-[50px] leading-[1.1] mb-3">
            Pricing
          </h2>
          <p className="text-gray-500 text-[16px] sm:text-[18px]">
            Same amount at checkout!
          </p>

          {/* Billing Cycle Pill Toggle */}
          <div className="relative mt-8 sm:mt-10 inline-flex items-center">
            {/* Green Discount Floating Badge */}
            <div className="absolute -top-3.5 right-2 z-10">
              <span className="bg-[#DCFCE7] text-[#15803D] text-[10.5px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-[#BBF7D0]">
                Save up to 50%
              </span>
            </div>

            {/* Toggle Container */}
            <div className="bg-[#EBE9E1] p-1.5 rounded-full flex items-center gap-1 border border-[#DFDDD5]">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 sm:px-6 py-2 rounded-full text-[13.5px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#121316] shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-[#121316]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 sm:px-6 py-2 rounded-full text-[13.5px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-[#121316] shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-[#121316]'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1140px] mx-auto pt-4">
          {plans.map((plan) => {
            const currentPrice = billingCycle === 'yearly' ? plan.yearlyEffectivePrice : plan.monthlyPrice;

            if (plan.isPopular) {
              return (
                /* Highlighted Popular Plan (Growth) with Blue Top Banner */
                <div
                  key={plan.id}
                  className="relative rounded-[28px] bg-[#0047FF] p-[3px] shadow-[0_16px_40px_rgba(0,71,255,0.18)] flex flex-col transition-all duration-300 md:-translate-y-2"
                >
                  {/* Popular Top Header */}
                  <div className="py-2.5 px-6 text-white text-[13.5px] font-semibold tracking-wide text-left">
                    Popular
                  </div>

                  {/* Inner White Card */}
                  <div className="bg-white rounded-[25px] p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Plan Name */}
                      <div className="text-[14px] sm:text-[15px] font-medium text-gray-700 mb-2">
                        {plan.badgeName}
                      </div>

                      {/* Dynamic Price Display */}
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-[36px] sm:text-[44px] font-bold text-[#121316] tracking-tight font-sans">
                          {currentPrice}
                        </span>
                        <span className="text-[15px] font-medium text-gray-500">/m</span>
                      </div>

                      {/* Annual Billed Subtitle */}
                      {billingCycle === 'yearly' ? (
                        <div className="text-[12px] text-emerald-600 font-medium mb-6">
                          {plan.yearlyBilledAmount} billed yearly ({plan.discountNote})
                        </div>
                      ) : (
                        <div className="text-[12px] text-gray-400 font-medium mb-6">
                          Billed monthly
                        </div>
                      )}

                      {/* CTA Button */}
                      <button
                        type="button"
                        onClick={onOpenSignUp}
                        className="w-full h-[48px] sm:h-[50px] bg-[#0047FF] hover:bg-[#0038CC] text-white text-[15px] font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer mb-8"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Feature List */}
                      <div className="space-y-3.5 pt-2 border-t border-gray-100">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-[13.5px] sm:text-[14px] text-gray-700">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              /* Standard Cards (Starter & Enterprise) */
              <div
                key={plan.id}
                className="bg-white rounded-[28px] border border-gray-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-gray-300"
              >
                <div>
                  {/* Plan Name */}
                  <div className="text-[14px] sm:text-[15px] font-medium text-gray-700 mb-2">
                    {plan.badgeName}
                  </div>

                  {/* Dynamic Price Display */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-[36px] sm:text-[44px] font-bold text-[#121316] tracking-tight font-sans">
                      {currentPrice}
                    </span>
                    <span className="text-[15px] font-medium text-gray-500">/m</span>
                  </div>

                  {/* Annual Billed Subtitle */}
                  {billingCycle === 'yearly' ? (
                    <div className="text-[12px] text-emerald-600 font-medium mb-6">
                      {plan.yearlyBilledAmount} billed yearly ({plan.discountNote})
                    </div>
                  ) : (
                    <div className="text-[12px] text-gray-400 font-medium mb-6">
                      Billed monthly
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={onOpenSignUp}
                    className="w-full h-[48px] sm:h-[50px] bg-[#0047FF] hover:bg-[#0038CC] text-white text-[15px] font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer mb-8"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Feature List */}
                  <div className="space-y-3.5 pt-2 border-t border-gray-100">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-[13.5px] sm:text-[14px] text-gray-700">
                        <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
