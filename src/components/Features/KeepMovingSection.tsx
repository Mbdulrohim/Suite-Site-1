import React, { useState } from 'react';
import { MoreHorizontal, MessageSquare, Box, Sparkles } from 'lucide-react';

export const KeepMovingSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [toggles, setToggles] = useState({ cortana: true, yumi: true, tadao: true });

  const toggleAgent = (key: 'cortana' | 'yumi' | 'tadao') => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="features" className="w-full py-16 md:py-28 lg:py-36 select-none">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[620px] mx-auto mb-12 md:mb-20">
          <h2 className="text-[#121316] font-medium tracking-tight text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] mb-4">
            Move work forward
          </h2>
          <p className="text-gray-500 text-[16px] sm:text-[18px] leading-[1.6]">
            Invite AI agents into a thread alongside your team to move work forward, faster.
          </p>
        </div>

        {/* 3-Card Grid with Active/Inactive Mobile Accordion & Desktop Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Card 0: Bring your own agents */}
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
              
              {/* Row 1: Cortana */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-200/70 flex items-center justify-center text-gray-500 shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-gray-800 leading-none mb-1 truncate">Cortana</div>
                    <div className="text-[11px] text-gray-400 truncate">Helps crush bugs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAgent('cortana');
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${toggles.cortana ? 'bg-[#858585]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.cortana ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Row 2: Yumi with 'Added by Sara' badge */}
              <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-[#858585] flex items-center justify-center shrink-0">
                    <Box className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-gray-800 leading-none mb-1 truncate">Yumi</div>
                    <div className="text-[11px] text-gray-400 truncate mb-1">Project management maestro</div>
                    <div className="inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 font-medium">
                      <span className="w-3 h-3 rounded-full bg-amber-200 overflow-hidden text-[8px] flex items-center justify-center">👩</span>
                      <span>Added by Sara</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAgent('yumi');
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${toggles.yumi ? 'bg-[#858585]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.yumi ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Row 3: Tadao */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-200/70 flex items-center justify-center text-gray-500 shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-gray-800 leading-none mb-1 truncate">Tadao</div>
                    <div className="text-[11px] text-gray-400 truncate">Workspace-wide helper</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAgent('tadao');
                    }}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${toggles.tadao ? 'bg-[#858585]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.tadao ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>

            </div>

            {/* Content Copy */}
            <div>
              <h3 className="text-gray-900 font-semibold text-[18px] sm:text-[19px] mb-2 tracking-tight">
                Bring your own agents
              </h3>
              <p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                Add your existing cloud or CLI agents to Ando so they can work alongside you. Note: Ando isn't an agent orchestration platform.
              </p>
            </div>
          </div>

          {/* Card 1: Share context */}
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
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12.5px] font-medium text-gray-800">Thread Context</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Synced with Notion, GitHub & Figma specs.
                  </div>
                </div>
              </div>
            </div>

            {/* Content Copy */}
            <div>
              <h3 className="text-gray-900 font-semibold text-[18px] sm:text-[19px] mb-2 tracking-tight">
                Share context
              </h3>
              <p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                Conversations, decisions, files, and tools are all in one place so agents understand the work around them, not just the last message they were sent.
              </p>
            </div>
          </div>

          {/* Card 2: Let them chime in */}
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
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[12px] font-medium text-gray-800">Agent proactive response</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  "I noticed a conflict in PR #402, would you like me to draft a fix?"
                </div>
              </div>
            </div>

            {/* Content Copy */}
            <div>
              <h3 className="text-gray-900 font-semibold text-[18px] sm:text-[19px] mb-2 tracking-tight">
                Let them chime in
              </h3>
              <p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
                Agents can proactively hop into conversations and help out when relevant without being explicitly called every single time.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
