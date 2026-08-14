import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSignUp, onNavigateSection }) => {
  return (
    <header id="main-header" className="w-full sticky top-0 z-50 transition-all duration-200">
      <div className="mx-auto max-w-[1240px] px-5 py-5 md:px-8 md:py-7 flex items-center justify-between">
        {/* Left: SUITE Logo */}
        <a 
          id="brand-logo"
          href="#" 
          className="group flex items-center gap-2.5 text-[#121316] font-semibold tracking-[-0.03em] text-[17px] select-none"
        >
          {/* Geometric Symbol: clean minimalistic nested operations glyph */}
          <div className="w-[18px] h-[18px] relative flex items-center justify-center">
            <div className="w-4 h-4 border-[1.5px] border-[#121316] rounded-[3px] rotate-45 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-105" />
            <div className="w-1.5 h-1.5 bg-[#121316] rounded-[1px] absolute" />
          </div>
          <span className="font-bold tracking-[-0.04em] text-[18px]">SUITE</span>
        </a>

        {/* Centre: Links (Desktop only, hidden < 768px) */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8 text-[14px] text-[#555861] font-medium tracking-tight">
          <a
            id="nav-link-about"
            href="#why-suite"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection?.('why-suite');
            }}
            className="hover:text-[#121316] transition-colors duration-150 py-1"
          >
            About
          </a>
          <a
            id="nav-link-features"
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection?.('features');
            }}
            className="hover:text-[#121316] transition-colors duration-150 py-1"
          >
            Features
          </a>
        </nav>

        {/* Right: Sign Up ↗ pill */}
        <button
          id="header-signup-button"
          onClick={onOpenSignUp}
          className="group inline-flex items-center justify-center gap-1.5 bg-[#121316] hover:bg-[#202227] text-[#FAF9F6] text-[13.5px] font-medium tracking-tight rounded-full px-[18px] h-[38px] md:h-[40px] transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
        >
          <span>Sign Up</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF9F6]/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
};
