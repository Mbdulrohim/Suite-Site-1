import React from 'react';
import { Bot, Inbox } from 'lucide-react';

export const WhySuiteSection: React.FC = () => {
  return (
    <section id="why-suite" className="w-full py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* Section Title */}
        <div className="max-w-[620px] mb-16 md:mb-24">
          <h2 className="text-[#121316] font-medium tracking-tight text-[32px] sm:text-[38px] md:text-[44px] leading-[1.1] mb-4">
            How is Suite different<br/>from <span className="text-gray-400">spreadsheets</span>
          </h2>
          <p className="text-gray-500 text-[18px] leading-[1.6]">
            We connect the parts of your business that usually live in separate places.
          </p>
        </div>

        {/* 3 Columns (1.5x scale) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-center justify-center relative z-10 max-w-[1140px] mx-auto">
          
          {/* Column 1: Products */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-50/80 border-[0.5px] border-[#e8e8e8] rounded-[24px] p-8 md:p-10 min-h-[220px] md:min-h-[260px] flex flex-col items-center justify-center relative mb-5 transition-all duration-200 hover:border-gray-300">
              <div className="flex flex-wrap gap-2.5 justify-center max-w-[260px]">
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-1.5 text-[14px] text-gray-700 font-medium">Sales</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-1.5 text-[14px] text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"/> Agent
                </span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-1.5 text-[14px] text-gray-700 font-medium">Data</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-1.5 text-[14px] text-gray-700 font-medium">Support</span>
              </div>
            </div>
            <span className="text-[16px] text-gray-700 font-medium tracking-tight">Products</span>
          </div>

          {/* Column 2: Activity */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-50/80 border-[0.5px] border-[#e8e8e8] rounded-[24px] p-8 md:p-10 min-h-[220px] md:min-h-[260px] flex flex-col items-center justify-center relative mb-5 gap-3 transition-all duration-200 hover:border-gray-300">
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 text-[13px] text-gray-400 w-[90%] text-left">
                When did the client approve...
              </div>
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 text-[13px] text-gray-700 w-[95%] text-left flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">They approved it on Tuesday.</span>
              </div>
            </div>
            <span className="text-[16px] text-gray-700 font-medium tracking-tight">Activity</span>
          </div>

          {/* Column 3: Tools */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-50/80 border-[0.5px] border-[#e8e8e8] rounded-[24px] p-8 md:p-10 min-h-[220px] md:min-h-[260px] flex flex-col items-center justify-center relative mb-5 transition-all duration-200 hover:border-gray-300">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                    {i === 5 ? <Inbox className="w-6 h-6 text-blue-500" /> : <div className="w-2.5 h-2.5 rounded bg-gray-200" />}
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[16px] text-gray-700 font-medium tracking-tight">Tools</span>
          </div>

        </div>

        {/* Dotted Lines down to Suite workspace */}
        <div className="mt-14 flex flex-col items-center relative">
          <svg width="480" height="50" viewBox="0 0 480 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block mb-5">
             <path d="M 60 0 C 60 38, 240 12, 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 420 0 C 420 38, 240 12, 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 240 0 L 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          
          <div className="text-[11px] text-gray-400 uppercase tracking-widest mb-3.5 font-medium">Bring it together…</div>
          
          <button className="bg-[#FAF9F6] border border-gray-200 hover:bg-white text-gray-800 text-[14px] font-medium px-6 py-2.5 rounded-full shadow-sm flex items-center gap-2.5 transition-all cursor-pointer hover:border-gray-300">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Bot className="w-3.5 h-3.5" />
            </div>
            Suite workspace
          </button>
        </div>

      </div>
    </section>
  );
};
