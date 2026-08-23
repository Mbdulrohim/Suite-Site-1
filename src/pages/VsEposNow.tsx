import { Check, Minus } from 'lucide-react';
import { CallToAction, PageShell, Panel, Section } from './Shell.tsx';

/**
 * The comparison page.
 *
 * Written to be right rather than flattering. Epos Now is a real company with
 * real customers, it operates in Nigeria through a local partner, and a page
 * that pretends otherwise is both false and easy to catch — which costs more
 * trust than the page could ever win.
 *
 * So every claim about them is sourced, dated, and hedged where the evidence is
 * second-hand: their own pricing page does not publish a monthly figure, and
 * the numbers that circulate come from third-party reviews. The section saying
 * where they are the better choice is not a courtesy either. A trader with a
 * restaurant and a card machine should buy Epos Now, and telling them so is how
 * the rest of the page stays believable.
 */
const ROWS: { label: string; suite: string; epos: string; ours: boolean }[] = [
  {
    label: 'What it costs',
    suite: '₦25,000 a month, published',
    epos: 'Quote on request',
    ours: true,
  },
  {
    label: 'Contract',
    suite: 'Monthly or yearly, stop when you like',
    epos: 'Reported at 24–36 months',
    ours: true,
  },
  {
    label: 'Hardware to buy',
    suite: 'None — it runs on the phone you own',
    epos: 'Terminal bundles from £249 / $349',
    ours: true,
  },
  {
    label: 'Built for',
    suite: 'Shops selling serialised electronics',
    epos: 'Retail and hospitality generally',
    ours: true,
  },
  {
    label: 'Card processing',
    suite: 'None — we record cash, transfer and POS',
    epos: 'Built in, at a percentage per sale',
    ours: false,
  },
  {
    label: 'Support',
    suite: 'Us, on WhatsApp, in Lagos hours',
    epos: '24/7, and a Nigerian partner',
    ours: false,
  },
];

export const VsEposNow = () => (
  <PageShell
    title="Suite vs Epos Now"
    tail="for a Nigerian electronics shop."
    standfirst="Epos Now is a serious product with a Nigerian presence. It is also a general retail till built in the UK, sold on a quote, and usually on a two-to-three year contract. Here is the honest comparison, including where it beats us."
  >
    <div className="mx-auto max-w-[1000px]">
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#ECEAE3]">
                <th className="p-5 sm:p-6 text-[13px] font-medium text-gray-400"> </th>
                <th className="p-5 sm:p-6 text-[15px] font-medium tracking-tight">Suite</th>
                <th className="p-5 sm:p-6 text-[15px] font-medium tracking-tight text-gray-500">
                  Epos Now
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-[#ECEAE3] last:border-0 align-top">
                  <td className="p-5 sm:p-6 text-[14px] text-gray-400">{row.label}</td>
                  <td className="p-5 sm:p-6 text-[14px] leading-[1.5]">
                    <span className="flex gap-2.5">
                      {row.ours
                        ? <Check className="w-4 h-4 mt-[2px] shrink-0 text-blue-500" />
                        : <Minus className="w-4 h-4 mt-[2px] shrink-0 text-gray-300" />}
                      <span>{row.suite}</span>
                    </span>
                  </td>
                  <td className="p-5 sm:p-6 text-[14px] leading-[1.5] text-gray-500">{row.epos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>

    <Section heading="What does Epos Now cost?">
      <p>
        Epos Now does not publish a monthly price. Their pricing page shows a hardware headline —
        a Complete POS System “from $349, was $1,099” — and everything else goes through a quote
        form or a phone call. The figures that circulate come from third-party reviews rather than
        from Epos Now: around £25–£39 a month in the UK, and in the US roughly $349 up front with a
        monthly software and support charge on top. Card processing is separate again, reported at
        1.5% in the UK and 2.6% plus $0.10 per transaction in the US.
      </p>
      <p>
        Suite costs ₦25,000 a month, or ₦15,000 a month if you pay for the year. That number is on
        our pricing page because a trader deciding whether to bother should not have to give a
        salesperson their phone number to find out.
      </p>
    </Section>

    <Section heading="Is Epos Now available in Nigeria?">
      <p>
        Yes. Epos Now launched here with Epos Solutions Nigeria as a local partner, and they offer
        round-the-clock support. If you want a large international vendor with somebody to ring at
        two in the morning, that is a real argument and we are not going to pretend otherwise.
      </p>
    </Section>

    <Section heading="So what is actually different?">
      <p>
        Epos Now is a till for retail and hospitality in general — a bakery, a bar, a boutique. It
        is broad by design. Suite is narrow by design: it exists for shops selling things that
        carry a serial number, and almost every decision in it follows from that.
      </p>
      <p>
        A general till holds “iPhone 13 Pro × 4” and takes one off when you sell. Suite holds four
        separate units, each with its own IMEI, its own cost, its own condition and its own days on
        the shelf — so you can answer what that specific handset cost you, what you made on it, who
        sold it, and whether the customer at the counter with a fault actually bought it here.
      </p>
      <p>
        The rest of the shop follows the same shape: who owes you money and when it falls due,
        what a swap was valued at, which supplier is still owed, what the floor price is and who
        went below it. That is a Computer Village shop, not a general retail category.
      </p>
    </Section>

    <Section heading="When you should buy Epos Now instead">
      <p>
        If you sell things without serial numbers — food, drinks, clothing, groceries — Suite is
        the wrong shape and Epos Now is a good product. If you want card payments taken by the same
        company that sells you the till, we do not do that at all; we record cash, transfer and
        your existing POS terminal and take no cut of any of them. And if a counter terminal with a
        cash drawer and a receipt printer is what your shop needs, they sell that and we do not.
      </p>
    </Section>

    <Section heading="What you are actually choosing between">
      <p>
        A broad international product on a multi-year contract with hardware and a quote, or a
        narrow Nigerian one at a published price on a phone you already own, built for exactly the
        goods you sell. Both are defensible. They are just not the same decision.
      </p>
    </Section>

    <div className="mx-auto max-w-[680px] pt-14">
      <p className="text-[12px] leading-[1.6] text-gray-400">
        Epos Now figures checked in August 2026 against{' '}
        <a className="underline hover:text-gray-600" href="https://www.eposnow.com/us/pricing/" rel="nofollow noopener" target="_blank">their pricing page</a>,{' '}
        <a className="underline hover:text-gray-600" href="https://tech.co/pos-system/epos-now-pos-review" rel="nofollow noopener" target="_blank">tech.co</a> and{' '}
        <a className="underline hover:text-gray-600" href="https://www.businessnewsdaily.com/eposnow-review" rel="nofollow noopener" target="_blank">Business News Daily</a>.
        Prices and contract terms are theirs to change, and quoted terms vary by customer — check
        with them before deciding. Epos Now is a trademark of its owner and we are not affiliated
        with them.
      </p>
    </div>

    <CallToAction line="If you sell phones, laptops or inverters, Suite is the one built for it." />
  </PageShell>
);
