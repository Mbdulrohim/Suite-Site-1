import React from 'react';
import {
  Barcode,
  Receipt,
  HandCoins,
  Truck,
  Repeat,
  Wrench,
  ArrowLeftRight,
  Wallet,
  FileText,
  BookOpen,
  User,
} from 'lucide-react';

/**
 * The spreadsheet comparison, which is the only competitor most of these shops
 * actually have. The three columns are the three things a sheet cannot do: hold
 * one shop in one system, remember who changed what, and know a handset from a
 * row of text.
 */
export const WhySuiteSection: React.FC = () => {
  const recordTypes = [
    { name: 'IMEI', icon: <Barcode className="w-4 h-4 text-blue-500" /> },
    { name: 'Receipts', icon: <Receipt className="w-4 h-4 text-indigo-500" /> },
    { name: 'Credit', icon: <HandCoins className="w-4 h-4 text-sky-500" /> },
    { name: 'Suppliers', icon: <Truck className="w-4 h-4 text-blue-500" /> },
    { name: 'Trade-ins', icon: <Repeat className="w-4 h-4 text-blue-500" /> },
    { name: 'Repairs', icon: <Wrench className="w-4 h-4 text-amber-500" /> },
    { name: 'Transfers', icon: <ArrowLeftRight className="w-4 h-4 text-sky-500" /> },
    { name: 'Expenses', icon: <Wallet className="w-4 h-4 text-emerald-500" /> },
    { name: 'Invoices', icon: <FileText className="w-4 h-4 text-indigo-500" /> },
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
            A sheet does not know that the row you are typing is a handset somebody already sold on the other till. Suite does, and it says so before the money changes hands.
          </p>
        </div>

        {/* 3 Columns (Desktop grid, responsive on mobile) - All same size matching Tools */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch justify-center relative z-10 max-w-[1140px] mx-auto">

          {/* Column 1: One system */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] p-6 sm:p-8 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col items-center justify-center relative mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="flex flex-wrap gap-2.5 justify-center max-w-[260px]">
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium">Stock</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"/> Sales
                </span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium">Credit</span>
                <span className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium">Suppliers</span>
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-medium tracking-tight">One system</span>
          </div>

          {/* Column 2: Activity — who changed what */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] p-6 sm:p-8 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col items-center justify-center relative mb-5 gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3.5 text-[13px] text-gray-400 w-full max-w-[260px] text-left">
                Who dropped the floor on that Pro Max?
              </div>
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3.5 text-[13px] text-gray-700 w-full max-w-[260px] text-left flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">Chuka, Tuesday 4:12pm.</span>
              </div>
              <div className="bg-white/90 shadow-sm border border-gray-100 rounded-xl px-3 py-1.5 text-[11px] text-gray-500 w-fit self-start ml-2 sm:ml-4 flex items-center gap-1.5">
                <User className="w-3 h-3 text-gray-400" />
                <span>₦950,000 → ₦900,000 · “Clearing slow stock”</span>
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-medium tracking-tight">Activity</span>
          </div>

          {/* Column 3: What it records */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] p-6 sm:p-8 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col items-center justify-center relative mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {recordTypes.map((record) => (
                  <div
                    key={record.name}
                    className="w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center gap-1 transition-transform duration-200 hover:scale-105"
                  >
                    {record.icon}
                    <span className="text-[10.5px] font-medium text-gray-700 tracking-tight">
                      {record.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-medium tracking-tight">What it records</span>
          </div>

        </div>

        {/* Connector: everything above converges into one set of books */}
        <div className="mt-8 md:mt-14 flex flex-col items-center w-full max-w-[420px]">
          {/* Vertical line on mobile, curved SVG on desktop */}
          <div className="w-[1px] h-10 bg-gray-300 md:hidden my-2" />

          <svg width="480" height="50" viewBox="0 0 480 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block mb-5">
             <path d="M 60 0 C 60 38, 240 12, 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 420 0 C 420 38, 240 12, 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M 240 0 L 240 50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          <div className="text-[12px] text-gray-400 font-medium tracking-tight mb-3">
            It all adds up to...
          </div>

          <div className="w-full sm:w-auto bg-[#F2F8F5] border border-[#A7F3D0] text-[#047857] text-[16px] sm:text-[17px] font-semibold px-8 py-3.5 rounded-full shadow-sm flex items-center justify-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#059669] flex items-center justify-center text-white">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span>One set of books</span>
          </div>
        </div>

      </div>
    </section>
  );
};
