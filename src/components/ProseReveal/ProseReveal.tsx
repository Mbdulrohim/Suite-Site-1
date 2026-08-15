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
      className="w-full py-16 sm:py-24 md:py-32 lg:py-36 select-none"
    >
      <div className="mx-auto max-w-[880px] px-5 sm:px-8 text-center">
        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          {PROSE_PARAGRAPHS.map((paragraph, pIdx) => {
            const words = paragraph.split(' ');
            return (
              <p 
                key={pIdx} 
                className="text-[24px] md:text-[36px] leading-[1.3] md:leading-[1.35] font-medium tracking-tight font-sans text-center"
                style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif' 
                }}
              >
                {words.map((word, wIdx) => (
                  <span
                    key={`${pIdx}-${wIdx}`}
                    ref={addToRefs}
                    className="inline-block mr-[0.26em] transition-colors will-change-[opacity,color]"
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
