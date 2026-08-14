import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { MaskedRotator } from './MaskedRotator';
import { ProductDashboard } from './ProductDashboard';

interface HeroProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const ACTION_WORDS = ['Record', 'Track', 'Manage', 'Sell', 'Move'];
const NOUN_WORDS = ['products', 'goods', 'services', 'inventory', 'orders'];

export const Hero: React.FC<HeroProps> = ({ onOpenSignUp, onNavigateSection }) => {
  return (
    <section id="hero-section" className="w-full pt-6 pb-20 md:pt-14 md:pb-28 lg:pt-16 lg:pb-36">
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
              className="group inline-flex items-center gap-1.5 text-[12.5px] md:text-[13px] font-medium text-[#5E6472] hover:text-[#121316] mb-6 md:mb-8 transition-colors duration-150 py-1"
            >
              <span>Everything your business moves, in one place</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#888E9E] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#121316]" />
            </a>

            {/* Dynamic Masked Main Headline */}
            <h1 
              id="hero-headline"
              className="text-[#121316] font-medium tracking-[-0.04em] text-[42px] xs:text-[48px] sm:text-[54px] lg:text-[58px] xl:text-[62px] leading-[1.02] sm:leading-[1.04] mb-6 select-none"
            >
              {/* Line 1: [Action] your */}
              <div className="flex items-baseline flex-wrap gap-x-2.5 sm:gap-x-3">
                <MaskedRotator 
                  idPrefix="rotator-actions"
                  words={ACTION_WORDS} 
                  className="text-[#121316] font-semibold border-b-[2px] border-[#121316]/10 pb-0.5" 
                />
                <span className="font-light text-[#4A4F5C]">your</span>
              </div>

              {/* Line 2: [Noun] in sync. */}
              <div className="flex items-baseline flex-wrap gap-x-2.5 sm:gap-x-3 mt-1 sm:mt-1.5">
                <MaskedRotator 
                  idPrefix="rotator-nouns"
                  words={NOUN_WORDS} 
                  delayOffset={150}
                  className="text-[#121316] font-semibold border-b-[2px] border-[#121316]/10 pb-0.5" 
                />
                <span className="font-light text-[#4A4F5C]">in sync.</span>
              </div>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-[#555B6A] text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.6] max-w-[440px] mb-8 font-normal">
              Keep stock, sales, services and operations connected without the spreadsheets, guesswork or duplicated work.
            </p>

            {/* Primary CTA Button (Black pill height 42px, px 18px, rounded 999px) */}
            <div className="flex items-center gap-4">
              <button
                id="hero-primary-cta"
                onClick={onOpenSignUp}
                className="group inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[14.5px] font-medium tracking-tight rounded-full h-[44px] px-[22px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <span>Sign Up</span>
                <ArrowUpRight className="w-4 h-4 text-[#FAF9F6]/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <span className="text-[12.5px] text-[#7E8494] font-mono hidden sm:inline">
                No credit card required
              </span>
            </div>

          </div>

          {/* Right Column: 58% on desktop (7 cols out of 12) */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end w-full mt-4 lg:mt-0">
            <ProductDashboard />
          </div>

        </div>

      </div>
    </section>
  );
};
