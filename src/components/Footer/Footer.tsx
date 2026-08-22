import React from 'react';
import wordmarkUrl from '../../assets/Wordmark.svg';

export interface FooterProps {
  onOpenSignUp?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateBlog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSignUp, onNavigateSection, onNavigateBlog }) => {
  return (
    <footer id="main-footer" className="w-full pt-16 pb-12 select-none overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Navigation & Brand Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 justify-between items-start mb-16 md:mb-24">
          
          {/* Bottom Left: Suite Wordmark & Copyright */}
          <div className="md:col-span-5 flex flex-col items-start justify-between h-full">
            <div>
              <a href="#" className="flex items-center select-none mb-3">
                <img src={wordmarkUrl} alt="SUITE" className="h-[25px]" />
              </a>
            </div>

            <div className="mt-8 md:mt-16 flex flex-col gap-1.5 text-[11px] text-[#8C92A4] font-mono">
              <span>© {new Date().getFullYear()} Copper Ledger LTD. Lagos, Nigeria.</span>
              <span>
                Built by{' '}
                <a
                  href="https://mbdulrohim.dev"
                  rel="author"
                  className="text-[#646A7A] hover:text-[#121316] transition-colors"
                >
                  mbdulrohim
                </a>
              </span>
            </div>
          </div>

          {/* Bottom Centre/Right: 3-column link groups */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-10">
            
            {/* Product Links */}
            <div className="flex flex-col gap-2.5 text-[13px]">
              <span className="font-semibold text-[#121316] text-[13px] tracking-tight mb-1">Product</span>
              <a 
                href="#features" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('features'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Features
              </a>
              <a 
                href="#why-suite" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('why-suite'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Why Suite
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('pricing'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Pricing
              </a>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-2.5 text-[13px]">
              <span className="font-semibold text-[#121316] text-[13px] tracking-tight mb-1">Company</span>
              <a 
                href="#why-suite" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('why-suite'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                About
              </a>
              <a 
                href="#blog" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (onNavigateBlog) {
                    onNavigateBlog();
                  } else {
                    window.location.hash = 'blog';
                  }
                }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Blog
              </a>
              <a 
                href="mailto:hello@suite.ng" 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col gap-2.5 text-[13px]">
              <span className="font-semibold text-[#121316] text-[13px] tracking-tight mb-1">Info</span>
              <a 
                href="#security" 
                onClick={(e) => { e.preventDefault(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Security
              </a>
              <a 
                href="#terms" 
                onClick={(e) => { e.preventDefault(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Terms of service
              </a>
              <a 
                href="#privacy" 
                onClick={(e) => { e.preventDefault(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Privacy policy
              </a>
            </div>

          </div>

        </div>

        {/* Big Masked SUITE Watermark spanning footer base */}
        <div 
          id="footer-suite-watermark"
          className="w-full flex items-center justify-center select-none pointer-events-none pt-4"
          aria-hidden="true"
        >
          <div
            className="w-full max-w-[1240px]"
            style={{
              height: 'clamp(80px, 18vw, 260px)',
              backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitMaskImage: `url(${wordmarkUrl})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${wordmarkUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              opacity: 0.85
            }}
          />
        </div>

      </div>
    </footer>
  );
};
