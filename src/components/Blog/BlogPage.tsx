import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, Check, Sparkles } from 'lucide-react';
import wordmarkUrl from '../../assets/Wordmark.svg';

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroImage?: string;
  heroImageCaption?: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    images?: {
      url: string;
      caption?: string;
    }[];
    quote?: string;
  }[];
}

const EDITORIAL_POSTS: BlogPost[] = [
  {
    id: 'building-inventory-architecture',
    title: 'Building Modern Inventory Architecture: From Spreadsheets to Real-Time Reconciliation',
    subtitle: 'How we engineered a sub-50ms distributed ledger for consumer electronics retailers managing thousands of high-velocity SKUs.',
    category: 'Engineering',
    readTime: '6 min read',
    publishedAt: 'August 14, 2026',
    author: {
      name: 'Tadao Vance',
      role: 'Head of Systems Architecture',
      avatar: '👨‍💻',
    },
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    heroImageCaption: 'Distributed transaction node cluster operating across retail branches.',
    sections: [
      {
        paragraphs: [
          'Managing physical hardware inventory has historically been plagued by reconciliation delays. A customer buys an iPhone 18 Pro Max at a physical branch in Ikeja, while an online order clears simultaneously for the same IMEI.',
          'Traditional databases lock rows or batch-sync every 15 minutes. In high-turnover electronics trading, a 15-minute sync window creates stockouts, double allocations, and chaotic manual adjustments.',
        ],
      },
      {
        heading: 'The Problem with Centralized Batching',
        paragraphs: [
          'When retail staff must wait on roundtrip latency to central servers during peak trading hours, local operations degrade. Staff resort to writing serial numbers on paper or messaging WhatsApp groups to reserve devices.',
          'At Suite, we built our state machine on top of continuous event-sourced reconciliation. Every gadget serial number is an immutable register entry that transitions through verifiable lifecycle states: In-Transit, On-Display, Reserved, Sold, or RMA.',
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
            caption: 'Real-time telemetry and state machine transitions across active device registers.',
          },
        ],
      },
      {
        heading: 'Optimistic Local Ledgers with CRDTs',
        paragraphs: [
          'By decoupling the point-of-sale terminal from central database roundtrips using optimistic local ledger state with conflict-free replicated data types (CRDTs), retail staff experience zero lag during customer checkout even with intermittent network connectivity.',
          'When connectivity restores, transactions reconcile deterministically without race conditions or overwritten customer warranty records.',
        ],
        quote: 'Reconciliation should not be an end-of-day chore. It should happen at the exact millisecond a barcode is scanned.',
      },
      {
        heading: 'Looking Ahead',
        paragraphs: [
          'As we onboard multi-store merchants across Nigeria and the UK, our mission remains unchanged: give retailers the tools to run their entire operation with zero friction.',
          'Stay tuned for upcoming deep dives into multi-agent automated purchase requisitions and supplier debt ledgers.',
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
            caption: 'Continuous cross-region synchronization active across all merchant clusters.',
          },
        ],
      },
    ],
  },
  {
    id: 'multi-agent-retail-operations',
    title: 'Why Multi-Agent Collaboration is the Future of Multi-Store Operations',
    subtitle: 'Autonomous agents like Cortana, Yumi, and Tadao working alongside store managers to automate supplier debt reconciliation.',
    category: 'Product & AI',
    readTime: '4 min read',
    publishedAt: 'August 08, 2026',
    author: {
      name: 'Sara K.',
      role: 'Product Lead',
      avatar: '👩‍💼',
    },
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    heroImageCaption: 'Visualizing agent context threads and proactive trigger workflows.',
    sections: [
      {
        paragraphs: [
          'AI shouldn\'t just be a chatbot window you type questions into; it should be an active coworker that listens to store events, notices stock discrepancies, and proactively drafts supplier inquiries.',
          'In Suite, agents are assigned explicit workspace permissions. When stock for a high-demand device drops below safety thresholds based on historical weekend run-rates, Yumi proactively drafts a purchase requisition to your verified supplier.',
        ],
      },
      {
        heading: 'Context Over Prompting',
        paragraphs: [
          'The real bottleneck in autonomous workflows has never been the LLM; it has been context fragmentation. When an agent has access to real-time invoices, inventory levels, and supplier terms, decisions become actionable rather than speculative.',
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
            caption: 'Multi-agent thread coordination inside Suite workspace.',
          },
        ],
      },
    ],
  },
  {
    id: 'joshville-case-study',
    title: 'How Joshville Scaled to 100M+ Monthly Gadget Volume with Zero Discrepancy',
    subtitle: 'Unifying supplier debt, POS terminals, and customer warranty receipts in one single dashboard.',
    category: 'Case Studies',
    readTime: '5 min read',
    publishedAt: 'July 29, 2026',
    author: {
      name: 'Oli Nwosu',
      role: 'Operations Specialist',
      avatar: '📦',
    },
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1600&auto=format&fit=crop',
    heroImageCaption: 'Joshville retail hub running Suite multi-terminal inventory reconciliation.',
    sections: [
      {
        paragraphs: [
          'Before switching to Suite, Joshville operated with a hybrid of WhatsApp supplier chats, Excel stock sheets, and paper invoice slips.',
          'End-of-month stocktakes took three full days and consistently uncovered unrecorded trade-ins and missing accessory margins.',
          'Within two weeks of deploying Suite across their retail outlets, reconciliation became continuous. Every device swap and accessory sale automatically updated customer warranty records and supplier credit ledgers in real-time.',
        ],
      },
    ],
  },
];

export interface BlogPageProps {
  onBackToHome: () => void;
  onOpenSignUp: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBackToHome, onOpenSignUp }) => {
  const [activeArticleId, setActiveArticleId] = useState<string>(EDITORIAL_POSTS[0].id);
  const [copied, setCopied] = useState(false);

  const activeArticle = EDITORIAL_POSTS.find(p => p.id === activeArticleId) || EDITORIAL_POSTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeArticleId]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] select-none flex flex-col justify-between antialiased font-sans">
      
      {/* Top Editorial Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#ECEAE4]">
        <div className="mx-auto max-w-[1240px] px-5 py-4 md:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-5">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-[14px] font-medium text-[#646A7A] hover:text-[#121316] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-[1px] bg-[#E0DED7] hidden sm:block" />
            <a href="#" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hidden sm:flex items-center select-none">
              <img src={wordmarkUrl} alt="SUITE" className="h-[22px]" />
            </a>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DFDDD5] text-[13px] font-medium text-[#646A7A] hover:text-[#121316] hover:bg-[#EAE8E1] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onOpenSignUp}
              className="bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[13.5px] font-medium px-5 py-2 rounded-full transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Article Layout */}
      <main className="flex-1 w-full max-w-[860px] mx-auto px-5 sm:px-8 py-14 sm:py-20 md:py-24">
        
        {/* Article Header (Centered Information Architecture) */}
        <article className="w-full">
          
          <div className="text-center max-w-[760px] mx-auto mb-10 md:mb-14">
            {/* Meta Category & Date */}
            <div className="text-[12.5px] sm:text-[13px] font-medium text-[#8A909E] tracking-wide mb-4 uppercase">
              {activeArticle.category} • {activeArticle.publishedAt}
            </div>

            {/* Main Headline */}
            <h1 
              className="text-[30px] xs:text-[36px] sm:text-[44px] md:text-[50px] leading-[1.12] font-medium tracking-tight text-[#121316] mb-6 font-sans select-text"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
            >
              {activeArticle.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center justify-center gap-3 text-[13.5px] sm:text-[14px] text-[#646A7A] font-medium">
              <span>Written by {activeArticle.author.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8A909E]" />
                {activeArticle.readTime}
              </span>
            </div>

            <div className="w-12 h-[1px] bg-[#D5D3CB] mx-auto mt-8" />
          </div>

          {/* Hero Figure Image */}
          {activeArticle.heroImage && (
            <figure className="w-full mb-12 sm:mb-16">
              <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[28px] border border-[#E8E6DE] bg-[#FAF9F7] shadow-xs">
                <img 
                  src={activeArticle.heroImage} 
                  alt={activeArticle.title} 
                  className="w-full h-auto max-h-[520px] object-cover"
                />
              </div>
              {activeArticle.heroImageCaption && (
                <figcaption className="text-center text-[12.5px] text-[#8A909E] mt-3 font-normal">
                  {activeArticle.heroImageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Editorial Article Body Content */}
          <div className="max-w-[700px] mx-auto space-y-8 select-text">
            {activeArticle.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-5">
                
                {/* Section Subheading */}
                {section.heading && (
                  <h2 className="text-[22px] sm:text-[26px] font-medium tracking-tight text-[#121316] pt-4 leading-[1.25]">
                    {section.heading}
                  </h2>
                )}

                {/* Section Paragraphs */}
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p 
                    key={pIdx} 
                    className="text-[16.5px] sm:text-[18px] leading-[1.75] text-[#3A3D44] font-normal"
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Blockquote callout */}
                {section.quote && (
                  <blockquote className="my-8 py-3 pl-5 border-l-2 border-[#121316] text-[18px] sm:text-[20px] leading-[1.55] font-medium text-[#121316] bg-[#F5F4EE]/50 rounded-r-xl pr-4">
                    “{section.quote}”
                  </blockquote>
                )}

                {/* Embedded Inline Images */}
                {section.images && section.images.map((img, iIdx) => (
                  <figure key={iIdx} className="my-8">
                    <div className="w-full overflow-hidden rounded-[18px] sm:rounded-[24px] border border-[#E8E6DE] bg-[#FAF9F7]">
                      <img 
                        src={img.url} 
                        alt={img.caption || 'Article illustration'} 
                        className="w-full h-auto max-h-[460px] object-cover"
                        loading="lazy"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="text-center text-[12.5px] text-[#8A909E] mt-2.5 font-normal">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}

              </section>
            ))}
          </div>

          {/* End of Story Author Sign-off Box */}
          <div className="max-w-[700px] mx-auto mt-14 pt-8 border-t border-[#E8E6DE] flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#EAE8E1] flex items-center justify-center text-[20px]">
                {activeArticle.author.avatar}
              </div>
              <div>
                <div className="text-[14.5px] font-medium text-[#121316]">{activeArticle.author.name}</div>
                <div className="text-[12.5px] text-[#8A909E]">{activeArticle.author.role}</div>
              </div>
            </div>

            <button
              onClick={onOpenSignUp}
              className="hidden sm:inline-flex items-center gap-2 text-[13.5px] font-medium text-[#121316] hover:text-[#000000] transition-colors"
            >
              <span>Try Suite Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </article>

        {/* Other Stories Selector / Footer Switcher */}
        <div className="mt-20 pt-12 border-t border-[#E8E6DE]">
          <div className="text-[13px] font-medium text-[#8A909E] uppercase tracking-wider mb-6 text-center">
            More from The Suite Dispatch
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[760px] mx-auto">
            {EDITORIAL_POSTS.filter(p => p.id !== activeArticle.id).map((post) => (
              <button
                key={post.id}
                onClick={() => setActiveArticleId(post.id)}
                className="text-left bg-white border border-[#ECEAE4] hover:border-[#D5D3CB] p-5 rounded-[20px] transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11.5px] font-medium text-[#8A909E] mb-2">{post.category}</div>
                  <div className="text-[15px] font-medium text-[#121316] group-hover:text-black leading-snug mb-3">
                    {post.title}
                  </div>
                </div>
                <div className="text-[12px] text-[#646A7A] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </main>

      {/* Editorial Suite Footer */}
      <footer className="w-full pt-16 pb-12 border-t border-[#ECEAE4] select-none">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 flex flex-col items-center text-center">
          
          <a href="#" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="mb-4">
            <img src={wordmarkUrl} alt="SUITE" className="h-[22px]" />
          </a>

          <div className="text-[12px] text-[#8C92A4] font-mono mb-8">
            © 2026 Copper Ledger Inc. • Dispatch & Engineering Notes
          </div>

          {/* Big Masked SUITE Watermark */}
          <div 
            className="w-full flex items-center justify-center select-none pointer-events-none pt-4"
            aria-hidden="true"
          >
            <div
              className="w-full max-w-[1040px]"
              style={{
                height: 'clamp(70px, 14vw, 200px)',
                backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitMaskImage: `url(${wordmarkUrl})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${wordmarkUrl})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                opacity: 0.8
              }}
            />
          </div>

        </div>
      </footer>

    </div>
  );
};
