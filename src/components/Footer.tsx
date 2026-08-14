import React from 'react';

interface FooterProps {
  onOpenSignUp: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSignUp, onNavigateSection }) => {
  return (
    <footer id="main-footer" className="w-full border-t border-[#EAE8E0]/80 pt-16 pb-20 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 justify-between items-start">
          
          {/* Bottom Left: Small Suite Icon & Brand identity */}
          <div className="md:col-span-5 flex flex-col items-start justify-between h-full">
            <div>
              <a href="#" className="flex items-center gap-2 text-[#121316] font-semibold text-[16px] tracking-tight mb-3">
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <div className="w-3.5 h-3.5 border-[1.5px] border-[#121316] rounded-[2.5px] rotate-45" />
                  <div className="w-1.5 h-1.5 bg-[#121316] rounded-[1px] absolute" />
                </div>
                <span className="font-bold tracking-[-0.03em]">SUITE</span>
              </a>
              <p className="text-[#6C7282] text-[13px] leading-[1.6] max-w-[300px]">
                Operations and inventory platform that quietly keeps everything in sync.
              </p>
            </div>

            <div className="mt-8 md:mt-16 text-[11px] text-[#8C92A4] font-mono">
              © 2026 Copper Ledger Inc.
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
                href="#features" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('features'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Inventory
              </a>
              <a 
                href="#features" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('features'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Orders
              </a>
              <a 
                href="#features" 
                onClick={(e) => { e.preventDefault(); onNavigateSection?.('features'); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Services
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
                href="#signup" 
                onClick={(e) => { e.preventDefault(); onOpenSignUp(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors flex items-center gap-1"
              >
                <span>Careers</span>
                <span className="text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] px-1 rounded">Hiring</span>
              </a>
              <a 
                href="#signup" 
                onClick={(e) => { e.preventDefault(); onOpenSignUp(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col gap-2.5 text-[13px]">
              <span className="font-semibold text-[#121316] text-[13px] tracking-tight mb-1">Legal</span>
              <a 
                href="#privacy" 
                onClick={(e) => { e.preventDefault(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Privacy
              </a>
              <a 
                href="#terms" 
                onClick={(e) => { e.preventDefault(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Terms
              </a>
              <a 
                href="#security" 
                onClick={(e) => { e.preventDefault(); }} 
                className="text-[#646A7A] hover:text-[#121316] transition-colors"
              >
                Security
              </a>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
