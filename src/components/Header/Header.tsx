import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import wordmarkUrl from '../../assets/Wordmark.svg';

export interface HeaderProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSignUp, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Shimmer keyframe injected once */}
      <style>{`
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(180,180,180,0.35) 40%,
            rgba(220,220,220,0.45) 50%,
            rgba(180,180,180,0.35) 60%,
            transparent 100%
          );
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
          border-radius: inherit;
        }
        .btn-shimmer.scrolled::after {
          animation: shimmer-sweep 1.6s ease-in-out infinite;
        }
      `}</style>

      <header id="main-header" className="w-full sticky top-0 z-50 transition-all duration-200">
        <div className="mx-auto max-w-[1240px] px-5 py-5 md:px-8 md:py-7 flex items-center justify-between">
          <a
            id="brand-logo"
            href="#"
            className="group flex items-center select-none"
          >
            <img src={wordmarkUrl} alt="SUITE" className="h-[27.5px] transition-transform duration-300 group-hover:scale-105" />
          </a>

          {/* Centre: Links (Desktop only) */}
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

          {/* Right: CTA button — shimmer starts on scroll */}
          <button
            id="header-signup-button"
            onClick={onOpenSignUp}
            className={`btn-shimmer${isScrolled ? ' scrolled' : ''} relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[14px] sm:text-[15px] font-medium tracking-tight rounded-full px-5 sm:px-[28px] h-[40px] sm:h-[45px] transition-all duration-200 active:scale-[0.98] cursor-pointer`}
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="relative z-10 w-4 h-4 text-[#FAF9F6]/85 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>
    </>
  );
};
