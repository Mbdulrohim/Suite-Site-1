import React from 'react';
import wordmarkUrl from '../../assets/Wordmark.svg';

export const HugeSuiteWatermark: React.FC = () => {
  return (
    <div 
      id="watermark-container"
      className="w-full overflow-hidden flex items-center justify-center select-none pointer-events-none py-10 sm:py-20"
      aria-hidden="true"
    >
      <div
        className="w-full max-w-[1240px] px-5"
        style={{
          height: 'clamp(100px, 20vw, 300px)',
          backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitMaskImage: `url(${wordmarkUrl})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${wordmarkUrl})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          opacity: 0.8
        }}
      />
    </div>
  );
};
