import React, { useEffect, useState } from 'react';
import wordmarkUrl from '../../assets/Wordmark.svg';

export interface HeaderProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSignUp, onNavigateSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="main-header" className="w-full sticky top-0 z-50 transition-all duration-200">
      <div className="mx-auto max-w-[1240px] px-5 py-5 md:px-8 md:py-7 flex items-center justify-between">
        <a
          id="brand-logo"
          href="#"
          className="group flex items-center select-none"
        >
          <img src={wordmarkUrl} alt="SUITE" className="h-[27.5px] transition-transform duration-300 group-hover:scale-105" />
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
          <a
            id="nav-link-pricing"
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection?.('pricing');
            }}
            className="hover:text-[#121316] transition-colors duration-150 py-1"
          >
            Pricing
          </a>
        </nav>

        {/* Right: CTA button — shimmer sweeps through text + arrow when user has scrolled */}
        <button
          id="header-signup-button"
          onClick={onOpenSignUp}
          className={`inline-flex items-center justify-center gap-2 text-[#FAF9F6] text-[14px] sm:text-[15px] font-medium tracking-tight rounded-full px-5 sm:px-[28px] h-[40px] sm:h-[45px] transition-all duration-200 active:scale-[0.98] cursor-pointer select-none overflow-hidden relative${scrolled ? ' shimmer-btn-active' : ' bg-[#121316] hover:bg-[#000000]'}`}
        >
          {/* Text label — shimmer applied via shimmer-active class when scrolled */}
          <span className={scrolled ? 'shimmer-active' : ''}>Get Started</span>

          {/* Arrow circle — shimmer via CSS background on button itself */}
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(-45deg)' }}
            >
              <path
                d="M2 7H12M12 7L7 2M12 7L7 12"
                stroke={scrolled ? '#FAF9F6' : '#FAF9F6'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
};
