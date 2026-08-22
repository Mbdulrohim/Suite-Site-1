import React from 'react';

/* 
 * Partner logos rendered as clean inline SVG wordmarks.
 * These are the brands Suite has worked with or been trusted by.
 */

const logos = [
  {
    name: 'Joshville',
    svg: (
      <svg width="90" height="28" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Joshville">
        <text x="0" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">Joshville</text>
      </svg>
    ),
  },
  {
    name: 'TechBridge',
    svg: (
      <svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TechBridge">
        <text x="0" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">TechBridge</text>
      </svg>
    ),
  },
  {
    name: 'Gadget Hub',
    svg: (
      <svg width="105" height="28" viewBox="0 0 105 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Gadget Hub">
        <text x="0" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">GadgetHub</text>
      </svg>
    ),
  },
  {
    name: 'MobileZone',
    svg: (
      <svg width="115" height="28" viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MobileZone">
        <text x="0" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">MobileZone</text>
      </svg>
    ),
  },
  {
    name: 'ApexStore',
    svg: (
      <svg width="100" height="28" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ApexStore">
        <text x="0" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">ApexStore</text>
      </svg>
    ),
  },
  {
    name: 'SmartDeals',
    svg: (
      <svg width="112" height="28" viewBox="0 0 112 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SmartDeals">
        <text x="0" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">SmartDeals</text>
      </svg>
    ),
  },
];

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners-section" className="w-full py-10 md:py-16 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Subtle Eyebrow Label */}
          <p className="text-[12px] md:text-[12.5px] font-medium tracking-wider text-[#8A909E] uppercase mb-8 md:mb-10">
            Trusted by stores across Nigeria
          </p>

          {/* Partner Logo Row */}
          <div className="w-full flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 md:gap-x-16 lg:gap-x-20 text-[#9CA3AF]">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default"
                title={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
