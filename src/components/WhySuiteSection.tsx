import React, { useEffect, useRef, useState } from 'react';
import { 
  Package, 
  Layers, 
  Wrench, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Zap, 
  FileText, 
  RotateCcw, 
  BarChart3, 
  Send, 
  Search,
  Plus,
  ArrowUpRight,
  RefreshCw,
  Sliders
} from 'lucide-react';

export const WhySuiteSection: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string>('Sell');
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tools = [
    { label: 'Add', icon: Plus },
    { label: 'Sell', icon: ArrowUpRight },
    { label: 'Move', icon: RefreshCw },
    { label: 'Refund', icon: RotateCcw },
    { label: 'Count', icon: Layers },
    { label: 'Report', icon: BarChart3 },
    { label: 'Invoice', icon: FileText },
    { label: 'Export', icon: Send },
    { label: 'Search', icon: Search },
  ];

  return (
    <section 
      id="why-suite" 
      ref={sectionRef} 
      className="w-full py-16 md:py-28 lg:py-36 border-t border-[#EAE8E0]/70 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Section Title */}
        <div className="max-w-[620px] mb-14 md:mb-20">
          <h2 className="text-[#121316] font-medium tracking-[-0.035em] text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1] mb-3.5">
            Why Suite works differently
          </h2>
          <p className="text-[#585E6E] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.55]">
            Your business isn’t a collection of disconnected spreadsheets. Your software shouldn’t be either.
          </p>
        </div>

        {/* 3 Floating Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start relative z-10">
          
          {/* Column 1: Products */}
          <div className="bg-[#FFFFFF] border border-[#ECEAE3] rounded-[16px] p-6 shadow-sm hover:border-[#DCDAD2] transition-colors">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#F0EEE8]">
              <span className="text-[12px] font-semibold text-[#121316] tracking-tight flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#2563EB]" />
                Products
              </span>
              <span className="text-[10.5px] font-mono text-[#8C92A4]">Catalog & Units</span>
            </div>

            {/* Floating product records */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] hover:bg-[#F4F3ED] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121316]" />
                  <span className="font-medium text-[#1A1D24]">iPhone 18 Pro</span>
                </div>
                <span className="font-mono text-[11px] text-[#555C6E] bg-[#EAE8E0] px-1.5 py-0.5 rounded">SKU-990</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] hover:bg-[#F4F3ED] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121316]" />
                  <span className="font-medium text-[#1A1D24]">MacBook Air</span>
                </div>
                <span className="font-mono text-[11px] text-[#555C6E] bg-[#EAE8E0] px-1.5 py-0.5 rounded">SKU-814</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] hover:bg-[#F4F3ED] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121316]" />
                  <span className="font-medium text-[#1A1D24]">AirPods Max</span>
                </div>
                <span className="font-mono text-[11px] text-[#555C6E] bg-[#EAE8E0] px-1.5 py-0.5 rounded">SKU-312</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] hover:bg-[#F4F3ED] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span className="font-medium text-[#1A1D24]">On-Site Installation</span>
                </div>
                <span className="text-[10px] font-medium text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded">Service</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] hover:bg-[#F4F3ED] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span className="font-medium text-[#1A1D24]">Express Repair SLA</span>
                </div>
                <span className="text-[10px] font-medium text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded">Service</span>
              </div>
            </div>
          </div>

          {/* Column 2: Activity */}
          <div className="bg-[#FFFFFF] border border-[#ECEAE3] rounded-[16px] p-6 shadow-sm hover:border-[#DCDAD2] transition-colors">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#F0EEE8]">
              <span className="text-[12px] font-semibold text-[#121316] tracking-tight flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#059669]" />
                Activity
              </span>
              <span className="text-[10.5px] font-mono text-[#8C92A4]">Live Events</span>
            </div>

            {/* Floating history cards */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] flex items-center justify-between hover:bg-[#F4F3ED] transition-colors">
                <div>
                  <div className="font-medium text-[#121316]">Stock +12 units</div>
                  <div className="text-[10px] text-[#717788]">London Central intake</div>
                </div>
                <span className="text-[10px] font-mono text-[#059669] font-medium">+12</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] flex items-center justify-between hover:bg-[#F4F3ED] transition-colors">
                <div>
                  <div className="font-medium text-[#121316]">Order #0184</div>
                  <div className="text-[10px] text-[#717788]">Dispatched to client</div>
                </div>
                <span className="text-[10px] font-mono text-[#2563EB] font-medium">Fulfilled</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] flex items-center justify-between hover:bg-[#F4F3ED] transition-colors">
                <div>
                  <div className="font-medium text-[#121316]">£1,249 received</div>
                  <div className="text-[10px] text-[#717788]">Stripe automatic sync</div>
                </div>
                <span className="text-[10px] font-mono text-[#15803D] font-medium">Settled</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] flex items-center justify-between hover:bg-[#F4F3ED] transition-colors">
                <div>
                  <div className="font-medium text-[#121316]">Item transferred</div>
                  <div className="text-[10px] text-[#717788]">Hub B ➔ Edinburgh</div>
                </div>
                <span className="text-[10px] font-mono text-[#6E7585]">Transit</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5] text-[12px] flex items-center justify-between hover:bg-[#F4F3ED] transition-colors">
                <div>
                  <div className="font-medium text-[#121316]">Customer updated</div>
                  <div className="text-[10px] text-[#717788]">Acme Corp credit line</div>
                </div>
                <span className="text-[10px] font-mono text-[#6E7585]">Synced</span>
              </div>
            </div>
          </div>

          {/* Column 3: Tools */}
          <div className="bg-[#FFFFFF] border border-[#ECEAE3] rounded-[16px] p-6 shadow-sm hover:border-[#DCDAD2] transition-colors">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#F0EEE8]">
              <span className="text-[12px] font-semibold text-[#121316] tracking-tight flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#121316]" />
                Tools
              </span>
              <span className="text-[10.5px] font-mono text-[#8C92A4]">9 Core Actions</span>
            </div>

            {/* Grid of actions */}
            <div className="grid grid-cols-3 gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = activeTool === tool.label;
                return (
                  <button
                    key={tool.label}
                    onClick={() => setActiveTool(tool.label)}
                    type="button"
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#121316] text-[#FFFFFF] border-[#121316] shadow-sm'
                        : 'bg-[#FAF9F7] text-[#373C48] border-[#EFECE5] hover:bg-[#F4F3ED]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 mb-1.5 ${isSelected ? 'text-[#FFFFFF]' : 'text-[#646A7A]'}`} />
                    <span className="text-[11px] font-medium tracking-tight">{tool.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-[#F0EEE8] text-center text-[11px] text-[#717788]">
              Active capability: <span className="font-mono font-medium text-[#121316]">{activeTool}</span>
            </div>
          </div>

        </div>

        {/* Dynamic Curved SVG Connector Lines flow toward One Source of Truth */}
        <div className="relative mt-8 md:mt-12 flex flex-col items-center select-none">
          
          {/* Desktop SVG branching lines */}
          <div className="w-full max-w-[880px] hidden md:block h-[110px] relative">
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 880 110" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Branch from Products (x: 146) to center (x: 440, y: 75) */}
              <path
                d="M 146 0 C 146 45, 440 30, 440 75"
                stroke="#D1CEBF"
                strokeWidth="1.25"
                strokeDasharray={isVisible ? "0" : "600"}
                strokeDashoffset={isVisible ? "0" : "600"}
                style={{
                  transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                }}
              />

              {/* Center Branch from Activity (x: 440) to center (x: 440, y: 75) */}
              <path
                d="M 440 0 L 440 75"
                stroke="#D1CEBF"
                strokeWidth="1.25"
                strokeDasharray={isVisible ? "0" : "200"}
                strokeDashoffset={isVisible ? "0" : "200"}
                style={{
                  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Right Branch from Tools (x: 734) to center (x: 440, y: 75) */}
              <path
                d="M 734 0 C 734 45, 440 30, 440 75"
                stroke="#D1CEBF"
                strokeWidth="1.25"
                strokeDasharray={isVisible ? "0" : "600"}
                strokeDashoffset={isVisible ? "0" : "600"}
                style={{
                  transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                }}
              />

              {/* Final vertical drop into node */}
              <path
                d="M 440 75 L 440 110"
                stroke="#D1CEBF"
                strokeWidth="1.25"
                strokeDasharray={isVisible ? "0" : "50"}
                strokeDashoffset={isVisible ? "0" : "50"}
                style={{
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
                }}
              />

              {/* Confluence dot */}
              <circle cx="440" cy="75" r="3" fill="#121316" />
            </svg>
          </div>

          {/* Mobile vertical line connector */}
          <div className="md:hidden w-[1.5px] h-[36px] bg-[#D1CEBF] my-2" />

          {/* Junction Text */}
          <div className="text-[12px] font-mono uppercase tracking-widest text-[#787E8E] mb-3 mt-1">
            Keep it all…
          </div>

          {/* Pill: ✦ One source of truth */}
          <div 
            id="suite-core-pill"
            className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#D5D3C8] hover:border-[#121316] text-[#121316] font-medium text-[13.5px] tracking-tight px-4 py-2 rounded-full shadow-sm transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="text-[#2563EB] text-[12px]">✦</span>
            <span>One source of truth</span>
          </div>

        </div>

      </div>
    </section>
  );
};
