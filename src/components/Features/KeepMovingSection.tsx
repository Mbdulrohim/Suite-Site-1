import React, { useState } from 'react';
import { MoreHorizontal, User, ShieldCheck, CloudOff, AlertTriangle } from 'lucide-react';

/**
 * Three cards, matched to the three things a shop owner actually asks before
 * putting a counter on new software: can my staff be trusted with it, does it
 * work when the network is down, and what happens when something goes wrong.
 *
 * The illustrations keep their original shapes — a toggle list, an info card, a
 * status card with a pulsing dot — because those shapes carry the layout. Only
 * what they are illustrating changed.
 */
export const KeepMovingSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [toggles, setToggles] = useState({ chuka: true, amina: true, tunde: false });

  const toggleStaff = (key: 'chuka' | 'amina' | 'tunde') => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="features" className="w-full py-16 md:py-28 lg:py-36 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[620px] mx-auto mb-12 md:mb-20">
          <h2 className="text-[#121316] font-medium tracking-tight text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] mb-4">
            Built for how the counter really works
          </h2>
          <p className="text-gray-500 text-[16px] sm:text-[18px] leading-[1.6]">
            Two people serving at once, on two phones, on a network that comes and goes. Suite is designed around that, not around an office desk.
          </p>
        </div>

        {/* 3-Card Grid with Active/Inactive Mobile Accordion & Desktop Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">

          {/* Card 0: Everyone on their own login */}
          <div
            onClick={() => setActiveCard(0)}
            className={`bg-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
              activeCard === 0
                ? 'border-2 border-[#858585] shadow-[0_8px_30px_rgba(133,133,133,0.12)]'
                : 'border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#858585]/50'
            }`}
          >
            {/* Top Interactive Toggle List: Hidden on mobile when inactive, visible when active or on desktop */}
            <div className={`${activeCard === 0 ? 'block' : 'hidden md:block'} bg-[#FAF9F7]/80 rounded-2xl p-4 mb-6 sm:mb-8 border border-gray-100 space-y-3 transition-all duration-200`}>

              {/* Row 1 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-200/70 flex items-center justify-center text-gray-500 shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-gray-800 leading-none mb-1 truncate">Chuka</div>
                    <div className="text-[11px] text-gray-400 truncate">Sells, cannot change a price</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStaff('chuka');
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${toggles.chuka ? 'bg-[#858585]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.chuka ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Row 2: highlighted, with who added them */}
              <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-[#858585] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-gray-800 leading-none mb-1 truncate">Amina</div>
                    <div className="text-[11px] text-gray-400 truncate mb-1">Manager — approves below floor</div>
                    <div className="inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 font-medium">
                      <span className="w-3 h-3 rounded-full bg-amber-200 overflow-hidden text-[8px] flex items-center justify-center">👤</span>
                      <span>Added by Owner</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStaff('amina');
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${toggles.amina ? 'bg-[#858585]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.amina ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Row 3: switched off rather than removed */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-200/70 flex items-center justify-center text-gray-500 shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-gray-800 leading-none mb-1 truncate">Tunde</div>
                    <div className="text-[11px] text-gray-400 truncate">Left the shop — access off</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStaff('tunde');
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${toggles.tunde ? 'bg-[#858585]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.tunde ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

            </div>

            {/* Content Copy */}
            <div>
              <h3 className="text-gray-900 font-semibold text-[18px] sm:text-[19px] mb-2 tracking-tight">
                Everyone on their own login
              </h3>
              <p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                A rep can sell without being able to move a price. Selling below the floor needs a manager. Somebody who leaves is switched off, not deleted — their sales stay in the books.
              </p>
            </div>
          </div>

          {/* Card 1: Works when the network doesn't */}
          <div
            onClick={() => setActiveCard(1)}
            className={`bg-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
              activeCard === 1
                ? 'border-2 border-[#858585] shadow-[0_8px_30px_rgba(133,133,133,0.12)]'
                : 'border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#858585]/50'
            }`}
          >
            {/* Illustration: Hidden on mobile when inactive, visible when active or on desktop */}
            <div className={`${activeCard === 1 ? 'block' : 'hidden md:block'} bg-[#FAF9F7]/80 rounded-2xl p-5 mb-6 sm:mb-8 border border-gray-100 min-h-[160px] flex flex-col justify-center gap-3 transition-all duration-200`}>
              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-gray-100 text-[#858585] flex items-center justify-center shrink-0">
                  <CloudOff className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12.5px] font-medium text-gray-800">No network</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    6 sales waiting. They go up the moment you are back.
                  </div>
                </div>
              </div>
            </div>

            {/* Content Copy */}
            <div>
              <h3 className="text-gray-900 font-semibold text-[18px] sm:text-[19px] mb-2 tracking-tight">
                Works when the network doesn't
              </h3>
              <p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                Sell, book in stock and print a receipt with no signal at all. Everything queues on the phone and sends itself when the network returns — and the other till catches up on its own.
              </p>
            </div>
          </div>

          {/* Card 2: Says what went wrong, in your words */}
          <div
            onClick={() => setActiveCard(2)}
            className={`bg-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
              activeCard === 2
                ? 'border-2 border-[#858585] shadow-[0_8px_30px_rgba(133,133,133,0.12)]'
                : 'border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#858585]/50'
            }`}
          >
            {/* Illustration: Hidden on mobile when inactive, visible when active or on desktop */}
            <div className={`${activeCard === 2 ? 'block' : 'hidden md:block'} bg-[#FAF9F7]/80 rounded-2xl p-5 mb-6 sm:mb-8 border border-gray-100 min-h-[160px] flex flex-col justify-center gap-3 transition-all duration-200`}>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[12px] font-medium text-gray-800">This unit was already sold</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  "Two sales were recorded for one handset. Check with the other till which one happened first."
                </div>
              </div>
            </div>

            {/* Content Copy */}
            <div>
              <h3 className="text-gray-900 font-semibold text-[18px] sm:text-[19px] mb-2 tracking-tight">
                Says what went wrong, in your words
              </h3>
              <p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                When something is refused, Suite says what it was, what to do about it, and whether trying again would even help. No error codes, no dead ends at the counter.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
