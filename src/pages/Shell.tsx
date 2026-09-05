import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Footer, Header, SignUpModal } from '../components';

/**
 * The frame the content pages sit in.
 *
 * Written to belong to the homepage rather than to look like documentation:
 * the same #FAF9F6 ground, the same 1240 container, the same medium-weight
 * tracking-tight headings with the second clause dropped to grey, the same
 * 28px cards on a half-pixel border, the same pill button. A page that arrives
 * from search is often the first thing somebody sees of Suite, so it cannot
 * read as an appendix to the site — it is the site.
 *
 * What stays plain is the structure underneath: one h1, headings that are real
 * questions, and prose an extractor can lift an answer out of without needing
 * the paragraph before it.
 */

export const PageShell = ({
  title, tail, standfirst, children,
}: {
  title: string;
  /** The clause that drops to grey, the way the homepage's headings do. */
  tail?: string;
  standfirst: string;
  children: ReactNode;
}) => {
  /*
   * The sign-up modal lives here too, rather than the buttons sending people
   * to the homepage to find it. Somebody who arrived on /pricing already knows
   * what they want; making them read the homepage first to say so is a step
   * that only loses them.
   */
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
  <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col justify-between selection:bg-[#121316] selection:text-[#FAF9F6] antialiased">
    {/*
      No onNavigateSection: there are no sections on this page to scroll to, and
      its absence is what tells the header to let its links navigate home
      instead of cancelling the click.
    */}
    <Header onOpenSignUp={() => { setSignUpOpen(true); }} />

    <main className="flex-1 w-full">
      <section className="w-full pt-20 pb-12 md:pt-32 md:pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[#121316] font-medium tracking-tight text-[30px] sm:text-[40px] md:text-[48px] leading-[1.08] text-balance">
            {title}
            {tail !== undefined && <> <span className="text-gray-400">{tail}</span></>}
          </h1>
          <p className="mt-6 text-gray-500 text-[16px] sm:text-[18px] leading-[1.6] mx-auto max-w-[620px]">
            {standfirst}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 pb-24 md:pb-36">
        <SignUpContext.Provider value={() => { setSignUpOpen(true); }}>
          {children}
        </SignUpContext.Provider>
      </div>
    </main>

    <Footer />

    <SignUpModal
      isOpen={signUpOpen}
      initialEmail=""
      onClose={() => { setSignUpOpen(false); }}
    />
  </div>
  );
};

/** So a CallToAction anywhere in the page can open the shell's own modal. */
export const SignUpContext = createContext<() => void>(() => {});
export const useSignUp = () => useContext(SignUpContext);

/** One question and its answer, at the measure the homepage sets for prose. */
export const Section = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <section className="mx-auto max-w-[680px] pt-14 md:pt-20 first:pt-0">
    <h2 className="text-[#121316] font-medium tracking-tight text-[22px] sm:text-[26px] leading-[1.2] text-balance">
      {heading}
    </h2>
    <div className="mt-5 space-y-4 text-gray-500 text-[16px] sm:text-[17px] leading-[1.65]">
      {children}
    </div>
  </section>
);

/** The homepage's card: a soft panel on a half-pixel border, not a bordered box. */
export const Panel: FC<{ children: ReactNode; className?: string }> = ({
  children, className = '',
}) => (
  <div
    className={`w-full bg-[#FAF9F7]/90 border-[0.5px] border-[#e8e8e8] rounded-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] ${className}`}
  >
    {children}
  </div>
);

/**
 * Facts as pills rather than a bulleted list. The homepage says everything this
 * way, and a column of dots is the thing that made these pages read as a manual.
 */
export const Pills = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2 pt-1">
    {items.map((item) => (
      <li
        key={item}
        className="bg-white shadow-sm border border-gray-100 rounded-full px-4 py-2 text-[14px] text-gray-700 font-medium"
      >
        {item}
      </li>
    ))}
  </ul>
);

/** A numbered idea in a panel — used where a list is genuinely a sequence. */
export const Steps = ({ items }: { items: { title: string; body: string }[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 pt-2">
    {items.map((item, index) => (
      <Panel key={item.title} className="p-6 sm:p-7">
        <span className="text-[13px] font-medium text-gray-400 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-3 text-[17px] font-medium tracking-tight leading-[1.3]">{item.title}</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-gray-500">{item.body}</p>
      </Panel>
    ))}
  </div>
);

export const CallToAction = ({ line }: { line: string }) => {
  const openSignUp = useContext(SignUpContext);
  return (
    <section className="w-full pt-24 md:pt-36 flex flex-col items-center text-center">
      <p className="max-w-[620px] text-[#121316] font-medium tracking-tight text-[24px] sm:text-[30px] md:text-[34px] leading-[1.12] text-balance">
        {line}
      </p>
      <button
        type="button"
        onClick={openSignUp}
        className="group mt-8 inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[15px] font-medium tracking-tight rounded-full h-[46px] px-[24px] transition-all duration-200 shadow-md hover:shadow-xl active:scale-[0.98] cursor-pointer"
      >
        Set my shop up
        <ArrowUpRight className="w-4 h-4 text-[#FAF9F6]/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </section>
  );
};
