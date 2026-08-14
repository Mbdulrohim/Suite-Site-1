import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ConversionSectionProps {
  onOpenSignUp: () => void;
}

export const ConversionSection: React.FC<ConversionSectionProps> = ({ onOpenSignUp }) => {
  return (
    <section 
      id="conversion-section" 
      className="w-full py-28 sm:py-36 md:py-48 lg:py-56 flex flex-col items-center justify-center text-center px-5"
    >
      <div className="max-w-[720px] mx-auto flex flex-col items-center">
        
        {/* Headline */}
        <h2 className="text-[#121316] font-medium tracking-[-0.04em] text-[34px] sm:text-[46px] md:text-[56px] lg:text-[62px] leading-[1.04] mb-8 select-none">
          Everything your business moves.
          <br />
          <span className="text-[#646A7A] font-light">Finally moving together.</span>
        </h2>

        {/* CTA Button */}
        <button
          id="conversion-signup-button"
          onClick={onOpenSignUp}
          className="group inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[15px] font-medium tracking-tight rounded-full h-[46px] px-[24px] transition-all duration-200 shadow-md hover:shadow-xl active:scale-[0.98] cursor-pointer"
        >
          <span>Sign Up</span>
          <ArrowUpRight className="w-4 h-4 text-[#FAF9F6]/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

      </div>
    </section>
  );
};
