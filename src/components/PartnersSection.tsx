import React from 'react';

interface Partner {
  name: string;
  logo: React.ReactNode;
}

export const PartnersSection: React.FC = () => {
  const partners: Partner[] = [
    {
      name: 'Linear',
      logo: (
        <svg className="h-5 md:h-6 w-auto fill-current" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.02 0C5.38 0 0 5.38 0 12.02s5.38 12.02 12.02 12.02c6.64 0 12.02-5.38 12.02-12.02S18.66 0 12.02 0zm-1.07 4.14c3.92 0 7.15 2.87 7.79 6.64H3.16c.64-3.77 3.87-6.64 7.79-6.64zm-7.79 8.95h15.58c-.64 3.77-3.87 6.64-7.79 6.64-3.92 0-7.15-2.87-7.79-6.64z" />
          <text x="32" y="17" className="font-semibold text-[15px] tracking-tight" fill="currentColor">Linear</text>
        </svg>
      ),
    },
    {
      name: 'Vercel',
      logo: (
        <svg className="h-5 md:h-6 w-auto fill-current" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L24 22H0L12 2Z" />
          <text x="32" y="17" className="font-semibold text-[15px] tracking-tight" fill="currentColor">Vercel</text>
        </svg>
      ),
    },
    {
      name: 'Raycast',
      logo: (
        <svg className="h-5 md:h-6 w-auto fill-current" viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.2 2.5a1.8 1.8 0 0 0-2.5 0L1.5 6.7a1.8 1.8 0 0 0 0 2.5l4.2 4.2a1.8 1.8 0 0 0 2.5 0l4.2-4.2a1.8 1.8 0 0 0 0-2.5L8.2 2.5zM17.5 11.8a1.8 1.8 0 0 0-2.5 0l-4.2 4.2a1.8 1.8 0 0 0 0 2.5l4.2 4.2a1.8 1.8 0 0 0 2.5 0l4.2-4.2a1.8 1.8 0 0 0 0-2.5l-4.2-4.2z" />
          <text x="30" y="17" className="font-semibold text-[15px] tracking-tight" fill="currentColor">Raycast</text>
        </svg>
      ),
    },
    {
      name: 'Supabase',
      logo: (
        <svg className="h-5 md:h-6 w-auto fill-current" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8 1.2c-.6-.8-1.9-.4-1.9.6v10.2H2.2c-1 0-1.5 1.2-.8 1.9l9.9 11.4c.6.8 1.9.4 1.9-.6V14.5h8.7c1 0 1.5-1.2.8-1.9L12.8 1.2z" />
          <text x="32" y="17" className="font-semibold text-[15px] tracking-tight" fill="currentColor">Supabase</text>
        </svg>
      ),
    },
    {
      name: 'Ramp',
      logo: (
        <svg className="h-5 md:h-6 w-auto fill-current" viewBox="0 0 90 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20L14 4h6L10 20H4z" />
          <path d="M12 20l5.5-9h6L18 20h-6z" opacity="0.6" />
          <text x="30" y="17" className="font-semibold text-[15px] tracking-tight" fill="currentColor">Ramp</text>
        </svg>
      ),
    },
    {
      name: 'Retool',
      logo: (
        <svg className="h-5 md:h-6 w-auto fill-current" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="7" height="7" rx="1.5" />
          <rect x="11" y="4" width="7" height="7" rx="1.5" opacity="0.7" />
          <rect x="2" y="13" width="7" height="7" rx="1.5" opacity="0.7" />
          <rect x="11" y="13" width="7" height="7" rx="1.5" opacity="0.4" />
          <text x="26" y="17" className="font-semibold text-[15px] tracking-tight" fill="currentColor">Retool</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="partners-section" className="w-full py-10 md:py-16 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Subtle Eyebrow Label */}
          <p className="text-[12px] md:text-[12.5px] font-medium tracking-wider text-[#8A909E] uppercase mb-8 md:mb-10">
            PARTNERS
          </p>

          {/* Logos Row */}
          <div className="w-full flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 text-[#6B7280]">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group transition-all duration-300 opacity-60 hover:opacity-100 hover:text-[#121316] transform hover:-translate-y-0.5 cursor-default flex items-center"
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
