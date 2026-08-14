import React from 'react';
import { Bot, Inbox, MessageSquare } from 'lucide-react';

export const WhySuiteSection: React.FC = () => {
  return (
    <section id="why-suite" className="w-full py-16 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* Section Title */}
        <div className="max-w-[580px] mb-14 md:mb-20">
          <h2 className="text-[#121316] font-medium tracking-tight text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1] mb-4">
            How is Suite different<br/>from <span className="text-gray-400">spreadsheets</span>
          </h2>
          <p className="text-gray-500 text-[18px] leading-[1.6]">
            We connect the parts of your business that usually live in separate places.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center justify-center relative z-10 max-w-[900px] mx-auto">
          
          {/* Column 1: Context */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-50/80 border-[0.5px] border-[#e8e8e8] rounded-2xl p-6 aspect-[4/3] flex flex-col items-center justify-center relative mb-4">
              <div className="flex flex-wrap gap-2 justify-center max-w-[200px] opacity-80">
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 font-medium">Sales</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"/> Agent</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 font-medium">Data</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 font-medium">Support</span>
              </div>
            </div>
            <span className="text-[13px] text-gray-600 font-medium">Products</span>
          </div>

          {/* Column 2: Memory */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-50/80 border-[0.5px] border-[#e8e8e8] rounded-2xl p-6 aspect-[4/3] flex flex-col items-center justify-center relative mb-4 gap-2">
              <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-2 text-[10px] text-gray-400 w-[80%] text-left">
                When did the client approve...
              </div>
              <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-2 text-[10px] text-gray-700 w-[90%] text-left flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <Bot className="w-2 h-2" />
                </div>
                <span>They approved it on Tuesday.</span>
              </div>
            </div>
            <span className="text-[13px] text-gray-600 font-medium">Activity</span>
          </div>

          {/* Column 3: Inbox */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-50/80 border-[0.5px] border-[#e8e8e8] rounded-2xl p-6 aspect-[4/3] flex flex-col items-center justify-center relative mb-4">
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <div key={i} className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center">
                    {i === 5 ? <Inbox className="w-4 h-4 text-blue-500" /> : <div className="w-2 h-2 rounded bg-gray-200" />}
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[13px] text-gray-600 font-medium">Tools</span>
          </div>

        </div>

        {/* Dotted Lines down to Custom agents */}
        <div className="mt-12 flex flex-col items-center relative">
          <svg width="400" height="40" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block mb-4">
             <path d="M 50 0 C 50 30, 200 10, 200 40" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 350 0 C 350 30, 200 10, 200 40" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 200 0 L 200 40" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Bring it together…</div>
          
          <button className="bg-[#FAF9F6] border border-gray-200 hover:bg-white text-gray-800 text-[13px] font-medium px-5 py-2 rounded-full shadow-sm flex items-center gap-2 transition-all cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Bot className="w-3 h-3" />
            </div>
            Suite workspace
          </button>
        </div>

      </div>
    </section>
  );
};
