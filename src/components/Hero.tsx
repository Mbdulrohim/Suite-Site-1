import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { MaskedRotator } from './MaskedRotator';
import { ProductDashboard } from './ProductDashboard';

interface HeroProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const ACTION_WORDS = ['Record', 'Manage', 'Track'];
const NOUN_WORDS = ['products', 'goods', 'services'];

export const Hero: React.FC<HeroProps> = ({ onOpenSignUp }) => {
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
              href="#"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-[12px] font-medium text-gray-600 hover:text-gray-900 mb-6 md:mb-8 transition-colors duration-150"
            >
              <span>Read “Running inventory from memory?”</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </a>

            {/* Main Headline */}
            <h1 
              id="hero-headline"
              className="text-[#121316] font-medium tracking-tight text-[42px] xs:text-[48px] sm:text-[54px] lg:text-[52px] xl:text-[58px] leading-[1.05] sm:leading-[1.05] mb-8 select-none"
            >
              <div className="flex items-baseline flex-wrap gap-x-2.5 sm:gap-x-3">
                <MaskedRotator 
                  idPrefix="rotator-actions"
                  words={ACTION_WORDS} 
                  className="text-[#121316] font-semibold" 
                />
              </div>
              <div className="flex items-baseline flex-wrap gap-x-2.5 sm:gap-x-3 mt-1 sm:mt-1.5">
                <MaskedRotator 
                  idPrefix="rotator-nouns"
                  words={NOUN_WORDS} 
                  delayOffset={150}
                  className="text-[#121316] font-semibold" 
                />
              </div>
            </h1>

            {/* CTA */}
            <div className="w-full max-w-[340px]">
              <button
                id="hero-primary-cta"
                onClick={onOpenSignUp}
                className="group inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[14.5px] font-medium tracking-tight rounded-full h-[44px] px-[22px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 text-[#FAF9F6]/85 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

          {/* Right Column: 58% on desktop (7 cols out of 12) */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end w-full mt-4 lg:mt-0 relative">
            {/* Cloudy background block */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#E2E8F0] to-[#F1F5F9] rounded-2xl opacity-60 mix-blend-multiply filter blur-3xl transform scale-95" />
            
            <div className="relative z-10 w-full p-4 md:p-8 bg-gradient-to-br from-[#d4e4f7] to-[#e2d5c3] rounded-[24px] shadow-sm">
              <ProductDashboard />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
