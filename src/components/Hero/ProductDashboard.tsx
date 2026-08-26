import React from 'react';
import { Bell, Boxes, CalendarCheck, ContactRound, Handshake, Landmark, Search, Zap } from 'lucide-react';

/**
 * What Suite actually looks like.
 *
 * This used to be a different product: a four-tab window called Overview /
 * Stock / Sales / Credit, in macOS chrome, with a ⌘K palette Suite has never
 * had and a "Syncing 4/4" badge advertising the offline layer we are removing.
 * A shop that signed up on the strength of it would have opened something else
 * entirely on the Monday.
 *
 * Built in markup rather than shipped as a screenshot, deliberately:
 *
 *  - every label here is text a crawler and an answer engine can read, which a
 *    PNG is opaque to, and being cited is half the point of this page;
 *  - it holds no real shop's cost prices, customers or IMEIs, which a
 *    screenshot of a live workspace would;
 *  - it reflows on a phone, where most of this site is read;
 *  - it is a few KB against a few hundred, on the largest element above the
 *    fold.
 *
 * The colours are Suite's own tokens, copied rather than imported because the
 * two apps are separate builds. If Suite's palette moves, this moves with it —
 * `src/index.css` in the Suite repo is the source of truth.
 */

const INK = '#16181d';
const INK_SOFT = '#5b606b';
const INK_FAINT = '#8c919c';
const PAPER = '#f2f3f0';
const SURFACE = '#ffffff';
const SUNKEN = '#ebece8';
const LINE = '#e7e8e4';
const ACCENT = '#2f6fed';
const GOOD = '#13744c';
const GOOD_WASH = '#e7f6ee';
const WARN = '#b4790e';
const WARN_WASH = '#fbf1de';

/** The real navigation, in the real groups, in the real order. */
const NAV: [string, { label: string; icon: React.ReactNode; active?: boolean }[]][] = [
  ['Operate', [
    { label: 'Inventory', icon: <Boxes className="w-3.5 h-3.5" />, active: true },
    { label: 'Counter sale', icon: <Zap className="w-3.5 h-3.5" /> },
    { label: 'Partner sourcing', icon: <Handshake className="w-3.5 h-3.5" /> },
    { label: 'Day close', icon: <CalendarCheck className="w-3.5 h-3.5" /> },
  ]],
  ['Manage', [
    { label: 'Customers', icon: <ContactRound className="w-3.5 h-3.5" /> },
  ]],
  ['Insight', [
    { label: 'Finance', icon: <Landmark className="w-3.5 h-3.5" /> },
  ]],
];

/** Stock lines, as Suite groups them: a model, and the units underneath it. */
const LINES = [
  { model: 'iPhone 13 Pro Max', spec: '256GB · Good · UK-Used', units: 4, cost: '2.1M', retail: '2.7M', profit: '596k', age: '9d', tone: 'fresh' },
  { model: 'Samsung S23 Ultra', spec: '512GB · Mint · Open Box', units: 2, cost: '1.4M', retail: '1.8M', profit: '384k', age: '21d', tone: 'aging' },
  { model: 'Infinix Note 40', spec: '256GB · Sealed', units: 11, cost: '1.9M', retail: '2.4M', profit: '517k', age: '4d', tone: 'fresh' },
];

/** One line opened, because per-unit tracking is the thing worth showing. */
const UNITS = [
  { imei: '356938•••472190', spec: 'Graphite · 92%', price: '₦685,000' },
  { imei: '356938•••118034', spec: 'Silver · 88%', price: '₦672,000' },
];

export const ProductDashboard: React.FC = () => (
  <div className="relative w-full max-w-[680px] mx-auto select-none">
    {/*
      A picture of an application, not an application. Nothing here responds to
      a click, so nothing here should look as though it would.
    */}
    <figure
      className="w-full rounded-[18px] md:rounded-[22px] overflow-hidden border m-0"
      style={{ background: PAPER, borderColor: LINE }}
    >
      <figcaption className="sr-only">
        Suite&rsquo;s Inventory workspace: stock grouped into lines by model, with every
        physical unit kept separately under its own IMEI, cost price and stock age.
      </figcaption>

      {/* Top bar — the shop's own name and branch, which is what Suite shows. */}
      <div
        className="h-[46px] px-4 flex items-center justify-between border-b"
        style={{ background: SURFACE, borderColor: LINE }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-[18px] h-[18px] rounded-[5px] shrink-0"
            style={{ background: INK }}
            aria-hidden
          />
          <span className="text-[12.5px] font-semibold tracking-tight truncate" style={{ color: INK }}>
            Ade Gadgets
          </span>
          <span className="text-[11px] hidden sm:inline truncate" style={{ color: INK_FAINT }}>
            Ikeja · Shop B12
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-2 rounded-lg px-2.5 h-7 text-[11px] border"
            style={{ background: PAPER, borderColor: LINE, color: INK_FAINT }}
          >
            <Search className="w-3 h-3" aria-hidden />
            <span>Search a stock line, IMEI, colour, or supplier</span>
          </div>
          <span className="relative" aria-hidden>
            <Bell className="w-4 h-4" style={{ color: INK_SOFT }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
              style={{ background: '#c9432f' }}
            />
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* The real sidebar: three groups, one solid accent row for where you are. */}
        <aside
          className="w-full md:w-[142px] shrink-0 border-b md:border-b-0 md:border-r p-2.5 space-y-3"
          style={{ background: SURFACE, borderColor: LINE }}
        >
          {NAV.map(([group, items]) => (
            <div key={group}>
              <p
                className="px-2 mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.1em]"
                style={{ color: INK_FAINT }}
              >
                {group}
              </p>
              <div className="flex md:block gap-1 md:gap-0 md:space-y-0.5 overflow-hidden">
                {items.map((item) => (
                  <span
                    key={item.label}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] whitespace-nowrap"
                    style={item.active
                      ? { background: ACCENT, color: '#ffffff', fontWeight: 600 }
                      : { color: INK_SOFT, fontWeight: 500 }}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Inventory: the screen that shows what Suite is for. */}
        <div className="flex-1 min-w-0 p-3 md:p-4 space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-1 text-[11.5px]" style={{ color: INK_SOFT }}>
            <span><strong style={{ color: INK }}>17</strong> units in stock</span>
            <span>Expected retail <strong style={{ color: INK }}>₦6.9M</strong></span>
            <span className="hidden sm:inline">Potential profit <strong style={{ color: GOOD }}>₦1.5M</strong></span>
          </div>

          <div className="rounded-xl overflow-hidden border" style={{ background: SURFACE, borderColor: LINE }}>
            <div
              className="hidden lg:grid grid-cols-[2fr_.6fr_1fr_1fr_.7fr] gap-3 px-4 py-2 text-[9.5px] font-bold uppercase tracking-wider border-b"
              style={{ background: SUNKEN, borderColor: LINE, color: INK_SOFT }}
            >
              <div>Stock line</div><div>Units</div><div>Cost (₦)</div><div>Retail (₦)</div><div>Oldest</div>
            </div>

            {LINES.map((line, index) => (
              <div key={line.model}>
                <div
                  className="grid grid-cols-[2fr_.6fr_1fr_1fr_.7fr] gap-3 px-4 py-2.5 items-center text-[12px]"
                  style={index > 0 ? { borderTop: `1px solid ${LINE}` } : undefined}
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate" style={{ color: INK }}>{line.model}</p>
                    <p className="text-[10.5px] truncate" style={{ color: INK_FAINT }}>{line.spec}</p>
                  </div>
                  <div style={{ color: INK_SOFT }}>{line.units}</div>
                  <div className="tabular-nums" style={{ color: INK_SOFT }}>{line.cost}</div>
                  <div className="tabular-nums font-medium" style={{ color: INK }}>{line.retail}</div>
                  <div>
                    <span
                      className="text-[9.5px] px-1.5 py-0.5 rounded-full font-semibold"
                      style={line.tone === 'aging'
                        ? { background: WARN_WASH, color: WARN }
                        : { background: GOOD_WASH, color: GOOD }}
                    >
                      {line.age}
                    </span>
                  </div>
                </div>

                {/*
                  One line opened. A stock line is a convenience; the unit is the
                  record, and this is the only way to say that without prose.
                */}
                {index === 0 && (
                  <div className="px-4 pb-3" style={{ background: PAPER }}>
                    <p
                      className="text-[9.5px] font-bold uppercase tracking-wider pt-2.5 pb-1.5"
                      style={{ color: INK_FAINT }}
                    >
                      Units · each tracked on its own
                    </p>
                    <div className="rounded-lg overflow-hidden border" style={{ background: SURFACE, borderColor: LINE }}>
                      {UNITS.map((unit, unitIndex) => (
                        <div
                          key={unit.imei}
                          className="flex items-center justify-between gap-3 px-3 py-1.5 text-[11px]"
                          style={unitIndex > 0 ? { borderTop: `1px solid ${LINE}` } : undefined}
                        >
                          <span className="font-mono truncate" style={{ color: INK }}>{unit.imei}</span>
                          <span className="hidden sm:inline truncate" style={{ color: INK_FAINT }}>{unit.spec}</span>
                          <span className="tabular-nums font-semibold shrink-0" style={{ color: INK }}>{unit.price}</span>
                        </div>
                      ))}
                      <div
                        className="px-3 py-1.5 text-[10.5px]"
                        style={{ borderTop: `1px solid ${LINE}`, color: INK_FAINT }}
                      >
                        + 2 more units on this line
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  </div>
);
