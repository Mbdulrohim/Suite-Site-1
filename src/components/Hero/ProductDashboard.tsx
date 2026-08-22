import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Package, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wrench, 
  Box
} from 'lucide-react';

export const ProductDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'stock' | 'sales' | 'items'>('home');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <div id="product-dashboard-container" className="relative w-full max-w-[680px] mx-auto select-none">
      {/* Main Window Frame */}
      <div 
        id="dashboard-window"
        className="w-full bg-[#FFFFFF] border border-[#E7E5DE] rounded-[18px] md:rounded-[22px] overflow-hidden"
      >
        {/* Window Top Navigation / Titlebar */}
        <div className="h-[46px] border-b border-[#EFECE6] px-4.5 bg-[#FAF9F7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Minimalist window controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC] border border-[#D5D3CC]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC] border border-[#D5D3CC]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5E3DC] border border-[#D5D3CC]" />
            </div>

            <div className="h-3.5 w-[1px] bg-[#E5E3DC] mx-1" />

            {/* Suite App identifier */}
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#252830] tracking-tight">
              <div className="w-3.5 h-3.5 border border-[#121316] rounded-[2px] rotate-45 flex items-center justify-center">
                <div className="w-1 h-1 bg-[#121316] rounded-[0.5px]" />
              </div>
              <span>Suite</span>
              <span className="text-[11px] font-normal text-[#8A8F9E] ml-1 hidden sm:inline">Ade Gadgets / Ikeja</span>
            </div>
          </div>

          {/* Search bar + Live Sync indicator */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 bg-[#FFFFFF] border border-[#E5E3DC] rounded-md px-2.5 py-1 text-[11.5px] text-[#7E8392]">
              <Search className="w-3 h-3 text-[#9CA3AF]" />
              <span>Search IMEI, model, customer...</span>
              <kbd className="font-mono text-[9px] bg-[#F3F2EE] px-1 py-0.5 rounded text-[#717684] border border-[#E5E3DC]">⌘K</kbd>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-[#DCFCE7] text-[#15803D] text-[10.5px] font-medium px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="hidden xs:inline font-mono">Syncing 4/4</span>
            </div>
          </div>
        </div>

        {/* Window Body: Left Sidebar + Main Content */}
        <div className="flex flex-col md:flex-row min-h-[360px]">
          {/* Left Minimal Sidebar */}
          <aside className="w-full md:w-[130px] border-b md:border-b-0 md:border-r border-[#EFECE6] bg-[#FAFAF8] p-2 md:p-3 flex md:flex-col justify-between md:justify-start gap-1">
            <div className="flex md:flex-col gap-1 w-full overflow-x-auto">
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors text-left ${
                  activeTab === 'home' 
                    ? 'bg-[#EAE8E1] text-[#121316] font-semibold' 
                    : 'text-[#646A79] hover:text-[#121316] hover:bg-[#F2F0E8]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 opacity-75" />
                <span>Overview</span>
              </button>

              <button 
                onClick={() => setActiveTab('stock')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors text-left ${
                  activeTab === 'stock' 
                    ? 'bg-[#EAE8E1] text-[#121316] font-semibold' 
                    : 'text-[#646A79] hover:text-[#121316] hover:bg-[#F2F0E8]'
                }`}
              >
                <Box className="w-3.5 h-3.5 opacity-75" />
                <span>Stock</span>
                <span className="ml-auto text-[10px] font-mono text-[#8C92A4] hidden md:inline">284</span>
              </button>

              <button 
                onClick={() => setActiveTab('sales')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors text-left ${
                  activeTab === 'sales' 
                    ? 'bg-[#EAE8E1] text-[#121316] font-semibold' 
                    : 'text-[#646A79] hover:text-[#121316] hover:bg-[#F2F0E8]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 opacity-75" />
                <span>Sales</span>
              </button>

              <button 
                onClick={() => setActiveTab('items')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors text-left ${
                  activeTab === 'items' 
                    ? 'bg-[#EAE8E1] text-[#121316] font-semibold' 
                    : 'text-[#646A79] hover:text-[#121316] hover:bg-[#F2F0E8]'
                }`}
              >
                <Package className="w-3.5 h-3.5 opacity-75" />
                <span>Credit</span>
              </button>
            </div>

            <div className="hidden md:flex flex-col gap-1 mt-auto pt-3 border-t border-[#EAE8E0]">
              <div className="px-2.5 py-1 text-[10px] font-mono text-[#949AA8] uppercase tracking-wider">
                Locations
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-[#555A68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="truncate">Ikeja Main</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-[#555A68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="truncate">Computer Village</span>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Canvas */}
          <main className="flex-1 p-3.5 sm:p-5 bg-[#FFFFFF] flex flex-col justify-between">
            {/* Top Metric Cards Row */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-semibold text-[#1F2228] tracking-tight">Overview</span>
                <span className="text-[11px] font-mono text-[#7D8392]">Live feed • updated just now</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* Metric 1 */}
                <div className="bg-[#FAF9F7] border border-[#ECEAE4] rounded-lg p-3 transition-colors hover:border-[#DFDDD6]">
                  <div className="text-[11px] text-[#6B7280] font-medium tracking-tight mb-1">Sales this month</div>
                  <div className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.03em] text-[#121316] font-mono">
                    ₦12.4m
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#15803D] font-medium">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span>+14.2% this mo</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#FAF9F7] border border-[#ECEAE4] rounded-lg p-3 transition-colors hover:border-[#DFDDD6]">
                  <div className="text-[11px] text-[#6B7280] font-medium tracking-tight mb-1">Units in stock</div>
                  <div className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.03em] text-[#121316] font-mono">
                    284
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#4B5563] font-medium">
                    <span>9 on hold</span>
                  </div>
                </div>

                {/* Metric 3 (hidden on small mobile) */}
                <div className="hidden sm:block bg-[#FAF9F7] border border-[#ECEAE4] rounded-lg p-3 transition-colors hover:border-[#DFDDD6]">
                  <div className="text-[11px] text-[#6B7280] font-medium tracking-tight mb-1">Owed by customers</div>
                  <div className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.03em] text-[#121316] font-mono">
                    ₦1.9m
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#2563EB] font-medium">
                    <span>6 accounts running</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="mt-4 pt-3 border-t border-[#F0EEE8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11.5px] font-semibold text-[#1F2228] tracking-tight">Recent activity</span>
                <span className="text-[10.5px] text-[#868C9C] hover:text-[#121316] cursor-pointer">View all 142 →</span>
              </div>

              <div className="space-y-1.5 text-[12px]">
                {/* Item 1 */}
                <div 
                  onClick={() => setSelectedRow(0)}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer border ${
                    selectedRow === 0 
                      ? 'bg-[#F4F6F8] border-[#D1D5DB]' 
                      : 'bg-[#FAF9F7] border-[#EFECE5] hover:bg-[#F5F4F0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                      <ArrowDownLeft className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-[#121316] truncate">iPhone 17 Pro Max</div>
                      <div className="text-[10px] text-[#717684]">Booked in • Alaba Imports</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-semibold text-[#059669]">+12</div>
                    <div className="text-[9.5px] text-[#9AA0AF] font-mono">2m ago</div>
                  </div>
                </div>

                {/* Item 2 */}
                <div 
                  onClick={() => setSelectedRow(1)}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer border ${
                    selectedRow === 1 
                      ? 'bg-[#F4F6F8] border-[#D1D5DB]' 
                      : 'bg-[#FAF9F7] border-[#EFECE5] hover:bg-[#F5F4F0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-[#121316] truncate">Samsung S25 Ultra</div>
                      <div className="text-[10px] text-[#717684]">Sold • Receipt PS-INV-0142</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-semibold text-[#DC2626]">-1</div>
                    <div className="text-[9.5px] text-[#9AA0AF] font-mono">14m ago</div>
                  </div>
                </div>

                {/* Item 3 */}
                <div 
                  onClick={() => setSelectedRow(2)}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer border ${
                    selectedRow === 2 
                      ? 'bg-[#F4F6F8] border-[#D1D5DB]' 
                      : 'bg-[#FAF9F7] border-[#EFECE5] hover:bg-[#F5F4F0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Wrench className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-[#121316] truncate">Screen repair — iPhone 14</div>
                      <div className="text-[10px] text-[#717684]">Inspection • Amina</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#DCFCE7] text-[#166534]">
                      Completed
                    </span>
                    <div className="text-[9.5px] text-[#9AA0AF] font-mono">1h ago</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Window Bottom Subtle Bar */}
        <div className="px-4 py-2 bg-[#FAF9F7] border-t border-[#EFECE6] flex items-center justify-between text-[11px] text-[#7B8191]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span>All tills in sync — nothing waiting to send</span>
          </div>
          <span className="font-mono text-[10px] text-[#9CA3AF]">v2.4.8-prod</span>
        </div>
      </div>
    </div>
  );
};
