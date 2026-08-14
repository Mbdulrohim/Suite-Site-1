import React from 'react';
import { Shield, Sparkles, Check } from 'lucide-react';

export const KeepMovingSection: React.FC = () => {
  return (
    <section id="features" className="w-full py-16 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[580px] mx-auto mb-12 md:mb-16">
          <h2 className="text-[#121316] font-medium tracking-tight text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1] mb-4">
            Move business forward
          </h2>
          <p className="text-gray-500 text-[15px] sm:text-[16px] leading-[1.6]">
            Stay on top of stock, sales and services without chasing spreadsheets, messages or missing updates.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Inbox-driven workflows */}
          <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            
            {/* UI Mockup Area */}
            <div className="relative mb-10 mt-2">
              <div className="bg-white rounded-[12px] border border-gray-100 p-3 shadow-sm mb-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                      <div className="w-2 h-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="text-[12px] font-medium text-gray-800">Q3 Planning</div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full">New</div>
                </div>
              </div>
              
              <div className="bg-white rounded-[12px] border border-gray-100 p-3 shadow-sm mb-3 ml-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center bg-blue-50 text-blue-500">
                      <Check className="w-3 h-3" />
                    </div>
                    <div className="text-[12px] font-medium text-gray-800 line-through opacity-50">Design review</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[12px] border border-gray-100 p-3 shadow-sm ml-8">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                      <div className="w-2 h-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="text-[12px] font-medium text-gray-800">Finalise copy</div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full">1m</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-gray-900 font-medium text-[16px] mb-2 tracking-tight">
                Record what matters
              </h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed">
                Add products, services and stock as they enter your business.
              </p>
            </div>
          </div>

          {/* Card 2: Share context */}
          <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between border border-gray-100 shadow-sm">
            {/* UI Mockup Area */}
            <div className="relative mb-10 mt-2">
              <div className="bg-gray-50 rounded-[12px] border border-gray-200 p-4 relative">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-gray-300 shrink-0 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="avatar" />
                  </div>
                  <div>
                    <div className="text-[12px] text-gray-800 mb-1">
                      <span className="font-semibold mr-1">Rory</span>
                      <span className="text-gray-400">@design</span>
                    </div>
                    <div className="text-[12px] text-gray-600">
                      Design team is moving to <span className="bg-yellow-100 text-yellow-800 px-1 rounded font-medium">Ando</span>! 🚀
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-medium text-gray-800">Email from 10:00am</span>
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">
                    Welcome to the Ando beta...
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-gray-900 font-medium text-[16px] mb-2 tracking-tight">
                See what’s moving
              </h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed">
                Know what came in, what went out and what needs attention.
              </p>
            </div>
          </div>

          {/* Card 3: Extreme reach */}
          <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
             
            {/* UI Mockup Area */}
            <div className="relative mb-10 mt-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-2 rounded-lg">
                   <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                     <Sparkles className="w-3.5 h-3.5" />
                   </div>
                   <div>
                     <div className="text-[12px] font-medium text-gray-800">Ask Ando <span className="text-gray-400 font-normal text-[10px] ml-1">Today at 10:00am</span></div>
                     <div className="text-[12px] text-gray-600 mt-0.5">
                       Drafting a response...
                     </div>
                   </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                   <div className="w-6 h-6 rounded bg-indigo-500 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                     D
                   </div>
                   <div>
                     <div className="text-[12px] font-medium text-gray-800">Discord User</div>
                     <div className="text-[12px] text-gray-600 mt-0.5">
                       Is there an API available for this?
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-gray-900 font-medium text-[16px] mb-2 tracking-tight">
                Keep it in sync
              </h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed">
                Updates flow across stock, orders and activity as work happens.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
