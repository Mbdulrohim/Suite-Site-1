import React, { useState } from 'react';
import { 
  Plus, 
  Package, 
  Wrench, 
  Box, 
  User, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  TrendingDown, 
  CreditCard, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const KeepMovingSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [selectedItemType, setSelectedItemType] = useState<'product' | 'service' | 'stock' | 'customer'>('product');

  return (
    <section id="features" className="w-full py-16 md:py-28 lg:py-36 border-t border-[#EAE8E0]/70">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[580px] mb-12 md:mb-16">
          <h2 className="text-[#121316] font-medium tracking-[-0.035em] text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1] mb-3.5">
            Keep business moving
          </h2>
          <p className="text-[#585E6E] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.55]">
            From stock arriving to an order leaving, Suite keeps every moving part connected.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Record everything */}
          <div
            id="feature-card-1"
            onMouseEnter={() => setActiveCard(0)}
            onFocus={() => setActiveCard(0)}
            tabIndex={0}
            className={`group relative bg-[#FFFFFF] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer outline-none ${
              activeCard === 0
                ? 'border-[1.5px] border-[#2563EB]/80 shadow-[0_12px_32px_-12px_rgba(37,99,235,0.12)] -translate-y-[2px]'
                : 'border border-[#ECEAE3] hover:border-[#DCDAD2] hover:-translate-y-[2px] shadow-sm'
            }`}
            style={{
              transition: 'all 350ms cubic-bezier(.22,1,.36,1)',
            }}
          >
            {/* Top Interactive UI Placeholder: Add-product form */}
            <div className="w-full bg-[#FAF9F7] border border-[#EFECE5] rounded-[12px] p-4 mb-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE3]">
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#121316]">
                  <Plus className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Add item</span>
                </div>
                <span className="text-[10px] font-mono bg-[#EAE8E0] px-1.5 py-0.5 rounded text-[#646A7A]">Quick entry</span>
              </div>

              {/* Selector Pills */}
              <div className="grid grid-cols-2 gap-1.5 mt-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedItemType('product'); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-all ${
                    selectedItemType === 'product'
                      ? 'bg-[#121316] text-[#FFFFFF] shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#ECEAE3] text-[#4A5060] hover:bg-[#F2F0E8]'
                  }`}
                >
                  <Package className="w-3 h-3" />
                  <span>Product</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedItemType('service'); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-all ${
                    selectedItemType === 'service'
                      ? 'bg-[#121316] text-[#FFFFFF] shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#ECEAE3] text-[#4A5060] hover:bg-[#F2F0E8]'
                  }`}
                >
                  <Wrench className="w-3 h-3" />
                  <span>Service</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedItemType('stock'); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-all ${
                    selectedItemType === 'stock'
                      ? 'bg-[#121316] text-[#FFFFFF] shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#ECEAE3] text-[#4A5060] hover:bg-[#F2F0E8]'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>Stock</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedItemType('customer'); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-all ${
                    selectedItemType === 'customer'
                      ? 'bg-[#121316] text-[#FFFFFF] shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#ECEAE3] text-[#4A5060] hover:bg-[#F2F0E8]'
                  }`}
                >
                  <User className="w-3 h-3" />
                  <span>Customer</span>
                </button>
              </div>

              {/* Dynamic preview row */}
              <div className="mt-3 pt-2.5 border-t border-[#ECEAE3] flex items-center justify-between text-[11px] text-[#717788]">
                <span className="font-mono">Auto-generated SKU</span>
                <span className="font-mono font-medium text-[#121316] bg-[#ECE9DF] px-1.5 py-0.5 rounded">
                  {selectedItemType === 'product' ? 'PRD-8821' : selectedItemType === 'service' ? 'SRV-0419' : selectedItemType === 'stock' ? 'STK-9902' : 'CST-3301'}
                </span>
              </div>
            </div>

            {/* Bottom Copy */}
            <div>
              <h3 className="text-[#121316] font-semibold text-[19px] sm:text-[20px] tracking-[-0.02em] mb-2">
                Record everything
              </h3>
              <p className="text-[#5E6474] text-[14px] sm:text-[14.5px] leading-[1.55]">
                Add products, services, stock and business activity as they happen.
              </p>
            </div>
          </div>

          {/* Card 2: Know what’s happening */}
          <div
            id="feature-card-2"
            onMouseEnter={() => setActiveCard(1)}
            onFocus={() => setActiveCard(1)}
            tabIndex={0}
            className={`group relative bg-[#FFFFFF] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer outline-none ${
              activeCard === 1
                ? 'border-[1.5px] border-[#2563EB]/80 shadow-[0_12px_32px_-12px_rgba(37,99,235,0.12)] -translate-y-[2px]'
                : 'border border-[#ECEAE3] hover:border-[#DCDAD2] hover:-translate-y-[2px] shadow-sm'
            }`}
            style={{
              transition: 'all 350ms cubic-bezier(.22,1,.36,1)',
            }}
          >
            {/* Top Interactive UI Placeholder: Live inventory numbers */}
            <div className="w-full bg-[#FAF9F7] border border-[#EFECE5] rounded-[12px] p-4 mb-8">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#ECEAE3]">
                <span className="text-[12px] font-semibold text-[#121316]">Inventory</span>
                <span className="text-[10px] font-mono text-[#059669] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Realtime
                </span>
              </div>

              <div className="space-y-1.5 mt-2.5">
                <div className="flex items-center justify-between text-[11.5px] py-1 px-1.5 rounded hover:bg-[#F2F0E8] transition-colors">
                  <span className="text-[#2B303C] font-medium">iPhone 18</span>
                  <span className="font-mono font-semibold text-[#121316]">24</span>
                </div>
                <div className="flex items-center justify-between text-[11.5px] py-1 px-1.5 rounded hover:bg-[#F2F0E8] transition-colors">
                  <span className="text-[#2B303C] font-medium">MacBook Air</span>
                  <span className="font-mono font-semibold text-[#121316]">11</span>
                </div>
                <div className="flex items-center justify-between text-[11.5px] py-1 px-1.5 rounded hover:bg-[#F2F0E8] transition-colors">
                  <span className="text-[#2B303C] font-medium">AirPods</span>
                  <span className="font-mono font-semibold text-[#121316]">38</span>
                </div>
                <div className="flex items-center justify-between text-[11px] py-1 px-1.5 rounded bg-[#FEF2F2] border border-[#FEE2E2]">
                  <span className="text-[#B91C1C] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Low stock alert
                  </span>
                  <span className="font-mono font-semibold text-[#B91C1C]">3</span>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div>
              <h3 className="text-[#121316] font-semibold text-[19px] sm:text-[20px] tracking-[-0.02em] mb-2">
                Know what’s happening
              </h3>
              <p className="text-[#5E6474] text-[14px] sm:text-[14.5px] leading-[1.55]">
                See quantities, movement and activity without digging through spreadsheets.
              </p>
            </div>
          </div>

          {/* Card 3: Keep it connected */}
          <div
            id="feature-card-3"
            onMouseEnter={() => setActiveCard(2)}
            onFocus={() => setActiveCard(2)}
            tabIndex={0}
            className={`group relative bg-[#FFFFFF] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer outline-none ${
              activeCard === 2
                ? 'border-[1.5px] border-[#2563EB]/80 shadow-[0_12px_32px_-12px_rgba(37,99,235,0.12)] -translate-y-[2px]'
                : 'border border-[#ECEAE3] hover:border-[#DCDAD2] hover:-translate-y-[2px] shadow-sm'
            }`}
            style={{
              transition: 'all 350ms cubic-bezier(.22,1,.36,1)',
            }}
          >
            {/* Top Interactive UI Placeholder: Activity stream */}
            <div className="w-full bg-[#FAF9F7] border border-[#EFECE5] rounded-[12px] p-4 mb-8">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#ECEAE3]">
                <span className="text-[12px] font-semibold text-[#121316]">Activity stream</span>
                <span className="text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded font-medium">
                  Auto-sync
                </span>
              </div>

              <div className="mt-2.5 space-y-2 relative">
                {/* Visual timeline connector line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-[#E2E0D8]" />

                {/* Event 1 */}
                <div className="flex items-start gap-2.5 relative">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#121316] text-[#FFFFFF] flex items-center justify-center text-[9px] shrink-0 z-10">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <div className="min-w-0 flex-1 text-[11px]">
                    <div className="font-semibold text-[#121316]">Order #1024 created</div>
                    <div className="text-[10px] text-[#6E7585] font-mono">-1 iPhone 18 Pro</div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex items-start gap-2.5 relative">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#2563EB] text-[#FFFFFF] flex items-center justify-center text-[9px] shrink-0 z-10">
                    <CreditCard className="w-2.5 h-2.5" />
                  </div>
                  <div className="min-w-0 flex-1 text-[11px]">
                    <div className="font-semibold text-[#121316]">Payment received</div>
                    <div className="text-[10px] text-[#059669] font-mono">£1,199 settled</div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex items-start gap-2.5 relative">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#10B981] text-[#FFFFFF] flex items-center justify-center text-[9px] shrink-0 z-10">
                    <RefreshCw className="w-2.5 h-2.5" />
                  </div>
                  <div className="min-w-0 flex-1 text-[11px]">
                    <div className="font-semibold text-[#121316]">Inventory updated</div>
                    <div className="text-[10px] text-[#6E7585] font-mono">3 warehouses reconciled</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div>
              <h3 className="text-[#121316] font-semibold text-[19px] sm:text-[20px] tracking-[-0.02em] mb-2">
                Keep it connected
              </h3>
              <p className="text-[#5E6474] text-[14px] sm:text-[14.5px] leading-[1.55]">
                A sale, return or update automatically flows through the rest of your business.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
