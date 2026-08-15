import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROSE_PARAGRAPHS = [
  'Same place for every gadget. Every transaction.',
  'From iPhones to MacBooks, Samsung, AirPods to power banks, every item is registered.',
  'Manage your gadgets and price changes, customers and their receipts, your suppliers and debts.',
  'Run your entire store from a single place.',
];

export const ProseReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  // Collect all word refs cleanly
  wordsRef.current = [];
  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0.15,
          color: '#A1A7B7',
        },
        {
          opacity: 1,
          color: '#121316',
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 35%',
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="prose-reveal"
      ref={containerRef} 
      className="w-full py-20 sm:py-28 md:py-36 lg:py-44 select-none"
    >
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 md:px-12">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          {PROSE_PARAGRAPHS.map((paragraph, pIdx) => {
            const words = paragraph.split(' ');
            return (
              <p 
                key={pIdx} 
                className="text-[26px] xs:text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] leading-[1.25] sm:leading-[1.22] font-medium tracking-tight font-sans"
                style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif' 
                }}
              >
                {words.map((word, wIdx) => (
                  <span
                    key={`${pIdx}-${wIdx}`}
                    ref={addToRefs}
                    className="inline-block mr-[0.28em] transition-colors will-change-[opacity,color]"
                  >
                    {word}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};
