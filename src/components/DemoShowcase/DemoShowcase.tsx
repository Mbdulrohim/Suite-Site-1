import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import macbookImg from '../../assets/macbook-5.png';

export interface DemoShowcaseProps {
  onOpenSignUp?: () => void;
}

export const DemoShowcase: React.FC<DemoShowcaseProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo-showcase" className="w-full py-12 md:py-20 lg:py-28 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Showcase Container */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#F5F4F0] via-[#FAF9F7] to-[#FAF9F6] border border-[#E8E6DE] p-4 sm:p-8 md:p-12 flex flex-col items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          
          {/* Main Visual Frame with Overlay */}
          <div className="relative w-full max-w-[1040px] flex items-center justify-center">
            
            {/* Big MacBook 5 Image */}
            <img 
              src={macbookImg} 
              alt="Suite MacBook Pro Demo" 
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />

            {/* Centered Play Demo Button (70px height, rounded 12px) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                id="play-demo-button"
                onClick={() => setIsPlaying(true)}
                className="pointer-events-auto group inline-flex items-center justify-center gap-3.5 bg-white/95 hover:bg-white text-[#121316] border border-white/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.22)] h-[60px] sm:h-[70px] px-7 sm:px-9 rounded-[12px] transition-all duration-300 hover:scale-105 active:scale-[0.98] cursor-pointer"
              >
                {/* Circular Play Icon badge */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#121316] text-[#FAF9F6] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span className="text-[16px] sm:text-[18px] font-semibold tracking-tight">
                  Play Demo
                </span>
              </button>
            </div>

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
