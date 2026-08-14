import React, { useEffect, useRef, useState } from 'react';

export const HugeSuiteWatermark: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how close the watermark is to the center of viewport
      const total = windowHeight + rect.height;
      const current = windowHeight - rect.top;
      const progress = Math.min(Math.max(current / total, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Opacity: .018 -> .045, translateY: 20px -> 0
  const opacity = 0.02 + scrollProgress * 0.025;
  const translateY = 20 * (1 - scrollProgress);

  return (
    <div 
      id="watermark-container"
      ref={containerRef}
      className="w-full overflow-hidden flex items-center justify-center select-none pointer-events-none py-4 sm:py-8"
      aria-hidden="true"
    >
      <div
        className="font-bold tracking-[-0.075em] leading-none whitespace-nowrap text-[#121316] transition-transform duration-150 will-change-transform"
        style={{
          fontSize: 'clamp(130px, 25vw, 380px)',
          opacity: opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        SUITE
      </div>
    </div>
  );
};
