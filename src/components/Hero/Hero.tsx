import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MaskedRotator } from './MaskedRotator';
import { ProductDashboard } from './ProductDashboard';
import { submitWaitlist } from '../../waitlist';

export interface HeroProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

/*
 * The two rotators run on the same interval with a small stagger, so index i of
 * one is read against index i of the other. They have to make three true
 * sentences in order, not three interchangeable words.
 */
const ACTION_WORDS = ['Track', 'Record', 'Settle'];
const NOUN_WORDS = ['stock', 'sales', 'books'];

export const Hero: React.FC<HeroProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState('sending');
    try {
      await submitWaitlist({ email, source: 'hero', website });
      setState('success');
    } catch {
      setState('error');
    }
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
              <span>Every handset tracked by IMEI</span>
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

            {/* CTA */}
            <form onSubmit={submit} className="w-full max-w-[360px]">
              <div className="flex items-center gap-3">
              <input
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => { setEmail(event.target.value); setState('idle'); }}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 bg-white text-[14px] sm:text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow"
              />
              <input
                type="text"
                name="website"
                value={website}
                onChange={(event) => { setWebsite(event.target.value); }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-px w-px opacity-0 pointer-events-none"
              />
              <button
                type="submit"
                disabled={state === 'sending' || state === 'success'}
                aria-label="Join the Suite waitlist"
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] text-gray-600 transition-colors shrink-0 disabled:opacity-60"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              </div>
              <p
                aria-live="polite"
                className={`mt-2 px-2 text-[12px] ${state === 'error' ? 'text-red-600' : 'text-gray-500'}`}
              >
                {state === 'sending' && 'Saving your place…'}
                {state === 'success' && 'You are on the list. We will reach out.'}
                {state === 'error' && 'We could not save that. Please try again.'}
              </p>
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
