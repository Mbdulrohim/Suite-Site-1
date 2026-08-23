import React from 'react';
import wordmarkUrl from '../../assets/Wordmark.svg';

export interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer id="main-footer" className="w-full pt-16 pb-20 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 justify-between items-start">
          
          {/* Bottom Left: Small Suite Icon & Brand identity */}
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
              {/*
                Real hrefs, not scroll handlers. These are separate documents,
                and a page nothing links to is a page a crawler has to be told
                about twice — once in the sitemap and never again.
              */}
              <a href="/pricing" className="text-[#646A7A] hover:text-[#121316] transition-colors">
                Pricing
              </a>
            </div>

            {/* Guides — the pages that answer what people actually search for. */}
            <div className="flex flex-col gap-2.5 text-[13px]">
              <span className="font-semibold text-[#121316] text-[13px] tracking-tight mb-1">Guides</span>
              <a href="/imei-stock-tracking" className="text-[#646A7A] hover:text-[#121316] transition-colors">
                Tracking stock by IMEI
              </a>
              <a href="/customer-debt-tracking" className="text-[#646A7A] hover:text-[#121316] transition-colors">
                Recording customer debts
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

      </div>
    </footer>
  );
};
