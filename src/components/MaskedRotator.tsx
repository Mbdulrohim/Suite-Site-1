import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MaskedRotatorProps {
  words: string[];
  className?: string;
  delayOffset?: number; // small offset if we want two rotators to stagger slightly or synchronized
  idPrefix?: string;
}

export const MaskedRotator: React.FC<MaskedRotatorProps> = ({
  words,
  className = '',
  delayOffset = 0,
  idPrefix = 'word-rotator',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const currentWordRef = useRef<HTMLSpanElement>(null);
  const nextWordRef = useRef<HTMLSpanElement>(null);
  const measurerRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  // Initialize initial container width
  useEffect(() => {
    if (measurerRef.current && containerRef.current) {
      measurerRef.current.textContent = words[0];
      const initialWidth = measurerRef.current.offsetWidth;
      gsap.set(containerRef.current, { width: initialWidth });
    }
  }, [words]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runTransition = () => {
      if (!containerRef.current || !currentWordRef.current || !nextWordRef.current || !measurerRef.current) return;
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      const nextIdx = (currentIndex + 1) % words.length;
      const nextText = words[nextIdx];

      // Measure width of upcoming word
      measurerRef.current.textContent = nextText;
      const targetWidth = measurerRef.current.offsetWidth;

      // Set text of the incoming element
      nextWordRef.current.textContent = nextText;

      // Prepare incoming element position
      gsap.set(nextWordRef.current, {
        yPercent: 110,
        opacity: 0,
        display: 'inline-block',
      });

      const tl = gsap.timeline({
        onComplete: () => {
          // Promote next word to current word
          if (currentWordRef.current) {
            currentWordRef.current.textContent = nextText;
            gsap.set(currentWordRef.current, {
              yPercent: 0,
              opacity: 1,
            });
          }
          if (nextWordRef.current) {
            gsap.set(nextWordRef.current, {
              display: 'none',
              yPercent: 110,
            });
          }
          setCurrentIndex(nextIdx);
          isAnimatingRef.current = false;
        },
      });

      // Animate container width smoothly with power4.inOut
      tl.to(
        containerRef.current,
        {
          width: targetWidth,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        0
      );

      // Animate outgoing word
      tl.to(
        currentWordRef.current,
        {
          yPercent: -110,
          opacity: 0,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        0
      );

      // Animate incoming word
      tl.to(
        nextWordRef.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        0
      );
    };

    // Hold time: 2200ms
    const intervalMs = 2850; // 2200ms hold + 650ms transition
    const startTimeout = setTimeout(() => {
      timer = setInterval(runTransition, intervalMs);
      runTransition();
    }, 2200 + delayOffset);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [currentIndex, words, delayOffset]);

  return (
    <span
      id={`${idPrefix}-container`}
      ref={containerRef}
      className={`inline-block relative overflow-hidden align-baseline select-none transition-[width] will-change-transform ${className}`}
      style={{
        height: '1.08em',
        verticalAlign: '-0.08em',
        display: 'inline-block',
      }}
    >
      {/* Active visible word */}
      <span
        id={`${idPrefix}-current`}
        ref={currentWordRef}
        className="inline-block whitespace-nowrap absolute left-0 top-0 text-[#121316] font-semibold"
      >
        {words[0]}
      </span>

      {/* Incoming animated word */}
      <span
        id={`${idPrefix}-next`}
        ref={nextWordRef}
        className="inline-block whitespace-nowrap absolute left-0 top-0 text-[#121316] font-semibold"
        style={{ display: 'none' }}
      >
        {words[1] || words[0]}
      </span>

      {/* Invisible off-DOM measurer */}
      <span
        ref={measurerRef}
        className="inline-block whitespace-nowrap absolute opacity-0 pointer-events-none -z-10 text-[#121316] font-semibold"
        aria-hidden="true"
      >
        {words[0]}
      </span>
    </span>
  );
};
