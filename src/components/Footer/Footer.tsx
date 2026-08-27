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

          {/* Bottom Centre/Right: 3-column link groups + Right-aligned Socials */}
          <div className="md:col-span-7 flex flex-col justify-between h-full">
            
            {/* 3 Link Columns on the same line: Product, Company, Info */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10">
              
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

              {/* Company Links (About, Blog, Contact) */}
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

              {/* Info Links */}
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

            {/* 3 Socials Icons aligned to the right with generous spacing */}
            <div className="flex items-center justify-start md:justify-end gap-5 mt-8 md:mt-12 text-[#8C92A4]">
              <a 
                href="https://x.com/suitedotng" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#121316] transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/suitedotng" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#121316] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/suitedotng" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#121316] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
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
