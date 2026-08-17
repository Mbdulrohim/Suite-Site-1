import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import macbookImg from '../../assets/macbook-5.png';

export interface DemoShowcaseProps {
  onOpenSignUp?: () => void;
}

export const DemoShowcase: React.FC<DemoShowcaseProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo-showcase" className="w-full py-8 sm:py-14 md:py-20 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Showcase Container: Image fills container with zero empty space around */}
        <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[24px] md:rounded-[28px] flex items-center justify-center">
          
          {/* Big MacBook 5 Image filling 100% of the container */}
          <img 
            src={macbookImg} 
            alt="Suite MacBook Pro Demo" 
            className="w-full h-auto block object-cover rounded-[18px] sm:rounded-[24px] md:rounded-[28px]"
            loading="lazy"
          />

          {/* Centered Black Rounded Play Demo Button (70px height) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              id="play-demo-button"
              onClick={() => setIsPlaying(true)}
              className="pointer-events-auto group inline-flex items-center justify-center gap-3 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] shadow-[0_16px_36px_rgba(0,0,0,0.32)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.4)] h-[58px] sm:h-[70px] px-8 sm:px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98] cursor-pointer"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FAF9F6] fill-current ml-0.5" />
              </div>
              <span className="text-[15px] sm:text-[17px] font-medium tracking-tight">
                Play Demo
              </span>
            </button>
          </div>

        </div>

      </div>

      {/* Interactive Video / Demo Overlay Modal */}
      {isPlaying && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPlaying(false)}
        >
          <div 
            className="relative w-full max-w-[960px] bg-[#121316] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl p-4 sm:p-6 text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close demo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="py-12 sm:py-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-5 animate-pulse">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-semibold mb-2">
                Suite Interactive Overview
              </h3>
              <p className="text-gray-400 text-[14px] sm:text-[15px] max-w-[480px]">
                Watch how fast stock synchronization, multi-channel gadgets, and receipts reconcile in real-time.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
