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
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8 text-[18px] text-[#555861] font-medium tracking-tight">
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

        {/* Right: CTA button */}
        <button
          id="header-signup-button"
          onClick={onOpenSignUp}
          className="group inline-flex items-center justify-center gap-2.5 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[15px] font-medium tracking-tight rounded-full px-[28px] h-[45px] transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 text-[#FAF9F6]/85 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
};
