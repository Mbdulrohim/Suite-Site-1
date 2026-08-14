import React from 'react';
import { 
  Bot, 
  Smile, 
  PenTool, 
  MessageCircle, 
  AtSign, 
  CornerUpLeft, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const WhySuiteSection: React.FC = () => {
  const toolsList = [
    { 
      name: 'React', 
      icon: <Smile className="w-4 h-4 text-blue-500" />,
      sub: null 
    },
    { 
      name: '', 
      icon: <PenTool className="w-4 h-4 text-indigo-500" />,
      sub: <span className="w-6 h-1.5 bg-gray-100 rounded-full inline-block" /> 
    },
    { 
      name: 'Think', 
      icon: <MessageCircle className="w-4 h-4 text-sky-500" />,
      sub: null 
    },
    { 
      name: '', 
      icon: <AtSign className="w-4 h-4 text-blue-500" />,
      sub: <span className="w-7 h-2 bg-gray-100 rounded-full inline-block" /> 
    },
    { 
      name: 'Reply', 
      icon: <CornerUpLeft className="w-4 h-4 text-blue-500" />,
      sub: null 
    },
    { 
      name: '', 
      icon: <ArrowRight className="w-4 h-4 text-blue-500" />,
      sub: <span className="w-6 h-1.5 bg-gray-100 rounded-full inline-block" /> 
    },
    { 
      name: 'Notion', 
      icon: (
        <span className="w-4 h-4 font-serif font-black text-[12px] flex items-center justify-center">
          N
        </span>
      ),
      sub: null 
    },
    { 
      name: 'Claude', 
      icon: <Sparkles className="w-4 h-4 text-orange-500" />,
      sub: null 
    },
    { 
      name: 'Linear', 
      icon: (
        <span className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center text-[8px] font-bold">
          L
        </span>
      ),
      sub: null 
    },
  ];

  return (
    <section id="why-suite" className="w-full py-16 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* Section Title */}
        <div className="max-w-[620px] mb-12 md:mb-24">
          <h2 className="text-[#121316] font-medium tracking-tight text-[28px] sm:text-[36px] md:text-[44px] leading-[1.1] mb-4">
            How is Suite different<br className="hidden sm:inline"/>from <span className="text-gray-400">spreadsheets</span>
          </h2>
          <p className="text-gray-500 text-[16px] sm:text-[18px] leading-[1.6]">
            For teams that want agents to feel more like coworkers than bots, Suite gives agents the tools and context they need to be truly proactive and helpful.
          </p>
        </div>

        {/* 3 Columns (Desktop grid, responsive on mobile) - All same size matching Tools */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch justify-center relative z-10 max-w-[1140px] mx-auto">
          
          {/* Column 1: Products */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] p-6 sm:p-8 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col items-center justify-center relative mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="flex flex-wrap gap-2.5 justify-center max-w-[260px]">
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium">Sales</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"/> Agent
                </span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium">Data</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium">Support</span>
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-medium tracking-tight">Products</span>
          </div>

          {/* Column 2: Activity / Memory */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] p-6 sm:p-8 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col items-center justify-center relative mb-5 gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3.5 text-[13px] text-gray-400 w-full max-w-[260px] text-left">
                When did the client approve...
              </div>
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3.5 text-[13px] text-gray-700 w-full max-w-[260px] text-left flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">They approved it on Tuesday.</span>
              </div>
              <div className="bg-white/90 shadow-sm border border-gray-100 rounded-xl px-3 py-1.5 text-[11px] text-gray-500 w-fit self-start ml-2 sm:ml-4 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-gray-200 overflow-hidden text-[9px] flex items-center justify-center">👤</span>
                <span>Oli: active after 5PM</span>
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-medium tracking-tight">Activity</span>
          </div>

          {/* Column 3: Tools */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] p-6 sm:p-8 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col items-center justify-center relative mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {toolsList.map((tool, idx) => (
                  <div 
                    key={idx} 
                    className="w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center gap-1 transition-transform duration-200 hover:scale-105"
                  >
                    {tool.icon}
                    {tool.name && (
                      <span className="text-[10.5px] font-medium text-gray-700 tracking-tight">
                        {tool.name}
                      </span>
                    )}
                    {tool.sub}
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-medium tracking-tight">Tools</span>
          </div>

        </div>

        {/* Connector to OpenClaw / Suite Agents Pill (Responsive SVG + Line) */}
        <div className="mt-8 md:mt-14 flex flex-col items-center w-full max-w-[420px]">
          {/* Vertical line on mobile, curved SVG on desktop */}
          <div className="w-[1px] h-10 bg-gray-300 md:hidden my-2" />
          
          <svg width="480" height="50" viewBox="0 0 480 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block mb-5">
             <path d="M 60 0 C 60 38, 240 12, 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 420 0 C 420 38, 240 12, 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 240 0 L 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          
          <div className="text-[12px] text-gray-400 font-medium tracking-tight mb-3">
            Bring your own...
          </div>
          
          <button className="w-full sm:w-auto bg-[#F2F8F5] border border-[#A7F3D0] hover:bg-[#E6F4ED] text-[#047857] text-[16px] sm:text-[17px] font-semibold px-8 py-3.5 rounded-full shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer">
            {/* Robot/Agent Icon */}
            <div className="w-6 h-6 rounded-full bg-[#059669] flex items-center justify-center text-white text-[12px]">
              🤖
            </div>
            <span>OpenClaw agents</span>
          </button>
        </div>

      </div>
    </section>
  );
};
