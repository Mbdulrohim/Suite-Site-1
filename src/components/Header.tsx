import React from 'react';
import { ArrowRight } from 'lucide-react';
import suiteLogo from '../assets/suite-logo.svg';
import wordmarkUrl from '../assets/Wordmark.svg';

interface HeaderProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSignUp, onNavigateSection }) => {
  return (
    <header id="main-header" className="w-full sticky top-0 z-50 transition-all duration-200">
      <div className="mx-auto max-w-[1240px] px-5 py-5 md:px-8 md:py-7 flex items-center justify-between">
        <a 
          id="brand-logo"
          href="#" 
          className="group flex items-center select-none"
        >
          <img src={wordmarkUrl} alt="SUITE" className="h-[22px] transition-transform duration-300 group-hover:scale-105" />
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
          className="group inline-flex items-center justify-center gap-2 bg-[#2D2D2D] hover:bg-[#1A1A1A] text-[#FAF9F6] text-[13.5px] font-medium tracking-tight rounded-[20px] px-[20px] h-[36px] transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
        >
          <span>Pre-order</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FAF9F6]/80 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
};
