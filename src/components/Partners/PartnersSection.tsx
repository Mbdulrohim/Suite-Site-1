import React from 'react';
import {
  Barcode,
  Receipt,
  HandCoins,
  Truck,
  Repeat,
  Building2,
} from 'lucide-react';

export interface Capability {
  name: string;
  icon: React.ReactNode;
}

/**
 * What this row used to be is worth stating, so it does not come back.
 *
 * It was a logo wall naming Linear, Vercel, Raycast, Supabase, Ramp and Retool
 * as partners of Suite. None of them are. A partner row is a claim about other
 * people's businesses, and it is the one kind of copy that cannot be fixed by
 * rewording — so it is now a strip of things Suite actually does, which is what
 * a shop owner scanning this band is looking for anyway.
 */
export const PartnersSection: React.FC = () => {
  const capabilities: Capability[] = [
    { name: 'IMEI intake', icon: <Barcode className="w-4 h-4" /> },
    { name: 'Counter sales', icon: <Receipt className="w-4 h-4" /> },
    { name: 'Customer credit', icon: <HandCoins className="w-4 h-4" /> },
    { name: 'Supplier ledgers', icon: <Truck className="w-4 h-4" /> },
    { name: 'Trade-ins', icon: <Repeat className="w-4 h-4" /> },
    { name: 'Multi-branch', icon: <Building2 className="w-4 h-4" /> },
  ];

  return (
    <section id="partners-section" className="w-full py-10 md:py-16 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Subtle Eyebrow Label */}
          <p className="text-[12px] md:text-[12.5px] font-medium tracking-wider text-[#8A909E] uppercase mb-8 md:mb-10">
            WHAT SUITE HANDLES
          </p>

          {/* Capability row (2-col on mobile, 3-col on tablet, flex row on desktop) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 text-[#6B7280]">
            {capabilities.map((capability) => (
              <div
                key={capability.name}
                className="group transition-all duration-300 opacity-60 hover:opacity-100 hover:text-[#121316] transform hover:-translate-y-0.5 cursor-default flex items-center justify-center gap-2 h-10"
              >
                {capability.icon}
                <span className="font-semibold text-[15px] tracking-tight whitespace-nowrap">
                  {capability.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
