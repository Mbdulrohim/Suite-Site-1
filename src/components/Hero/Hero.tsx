import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MaskedRotator } from './MaskedRotator';
import { ProductDashboard } from './ProductDashboard';

export interface HeroProps {
  onOpenSignUp: (email?: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

/*
 * The two rotators run on the same interval with a small stagger, so index i of
 * one is read against index i of the other. They have to make three true
 * sentences in order, not three interchangeable words.
 */
const ACTION_WORDS = ['Track', 'Record', 'Settle'];
const NOUN_WORDS = ['stock', 'sales', 'books'];

export const Hero: React.FC<HeroProps> = ({ onOpenSignUp, onNavigateSection }) => {
  const [email, setEmail] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onOpenSignUp(email.trim());
  };

  return (
    <section id="hero-section" className="w-full pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-36">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">

        {/* Asymmetric 2-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: 42% on desktop (5 cols out of 12) */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">

            {/* Eyebrow copy */}
            <a
              id="hero-eyebrow"
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection?.('features');
              }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border-[0.5px] border-gray-300 bg-transparent text-[13px] text-gray-600 hover:text-gray-900 mb-6 md:mb-8 transition-colors duration-150"
            >
              <span>Join Us: over 100M processed.</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </a>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="tracking-tight text-[32px] xs:text-[38px] sm:text-[48px] lg:text-[48px] xl:text-[54px] leading-[1.12] mb-8 select-none font-sans"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            >
              <div className="font-medium text-black flex items-baseline gap-x-2 sm:gap-x-3 whitespace-nowrap">
                <MaskedRotator
                  idPrefix="rotator-actions"
                  words={ACTION_WORDS}
                  className="font-medium text-black"
                />
              </div>
              <div className="font-medium text-gray-500 flex items-baseline gap-x-2 sm:gap-x-2.5 mt-1 sm:mt-1.5 whitespace-nowrap">
                <span className="inline-block whitespace-nowrap">your</span>
                <MaskedRotator
                  idPrefix="rotator-nouns"
                  words={NOUN_WORDS}
                  delayOffset={150}
                  className="font-medium text-gray-500"
                />
              </div>
            </h1>

            {/* CTA — pill button + flush black 70×70 circle with white arrow */}
            <form onSubmit={submit}>
              <div className="inline-flex items-center gap-0">
                {/* Pill button */}
                <button
                  type="submit"
                  className="inline-flex items-center h-[70px] bg-[#121316] hover:bg-[#000000] text-white rounded-full px-8 text-[24px] font-medium leading-none whitespace-nowrap transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Get Started
                </button>

                {/* Flush black 70×70 circle with white arrow at 45° */}
                <button
                  type="submit"
                  aria-hidden="true"
                  className="w-[70px] h-[70px] rounded-full bg-[#121316] hover:bg-[#000000] flex items-center justify-center shrink-0 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: 'rotate(-45deg)' }}
                  >
                    <path
                      d="M3 11H19M19 11L11 3M19 11L11 19"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: 58% on desktop (7 cols out of 12) */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end w-full mt-4 lg:mt-0 relative scale-100 lg:scale-[1.1]">
            <div className="w-full p-3.5 sm:p-5 md:p-6 bg-gradient-to-br from-[#EEF4FB] via-[#F4F7FB] to-[#F7F5F0] rounded-[28px] border border-[#E4ECF4]">
              <ProductDashboard />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
