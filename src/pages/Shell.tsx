/**
 * The frame every content page sits in.
 *
 * These pages exist to be found and quoted, so the shape is deliberately plain:
 * one h1, prose an extractor can lift a whole answer out of without needing the
 * paragraph before it, and no interactive chrome competing with the text. The
 * homepage sells; these answer a question somebody typed.
 */
import type { ReactNode } from 'react';
import { Footer, Header } from '../components';

export const PageShell = ({
  eyebrow, title, standfirst, children,
}: {
  eyebrow: string;
  title: string;
  standfirst: string;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col justify-between antialiased">
    <Header onOpenSignUp={() => { window.location.href = '/#waitlist'; }} onNavigateSection={() => {}} />
    <main className="flex-1 w-full">
      <article className="mx-auto w-full max-w-[720px] px-6 py-20 sm:py-28">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] font-semibold">{eyebrow}</p>
        <h1 className="mt-4 text-[34px] sm:text-[44px] leading-[1.1] tracking-[-0.02em] font-semibold text-balance">
          {title}
        </h1>
        <p className="mt-5 text-[17px] sm:text-[19px] leading-[1.6] text-[#6B7280]">{standfirst}</p>
        <div className="mt-12 space-y-10">{children}</div>
      </article>
    </main>
    <Footer onNavigateSection={() => {}} />
  </div>
);

/** A question and its answer, sized so a model can lift the pair intact. */
export const Section = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <section>
    <h2 className="text-[22px] sm:text-[26px] leading-[1.25] tracking-[-0.015em] font-semibold text-balance">
      {heading}
    </h2>
    <div className="mt-4 space-y-4 text-[16px] sm:text-[17px] leading-[1.65] text-[#374151]">
      {children}
    </div>
  </section>
);

export const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span aria-hidden className="mt-[10px] h-[5px] w-[5px] rounded-full bg-[#121316] shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const CallToAction = ({ line }: { line: string }) => (
  <aside className="rounded-2xl border border-[#ECEAE3] bg-white p-6 sm:p-8">
    <p className="text-[17px] leading-[1.55] font-medium">{line}</p>
    <a
      href="/#waitlist"
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#121316] px-5 py-2.5 text-[14px] font-medium text-[#FAF9F6] hover:opacity-90 transition-opacity"
    >
      Ask us to set your shop up →
    </a>
  </aside>
);
