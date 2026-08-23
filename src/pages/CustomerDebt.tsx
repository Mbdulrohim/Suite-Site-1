import { CallToAction, PageShell, Panel, Pills, Section } from './Shell.tsx';

export const CustomerDebt = () => (
  <PageShell
    title="How to keep records of customers"
    tail="who owe you money."
    standfirst="Every shop sells on trust sometimes. The problem is never the trust — it is that the record of it lives in a notebook, a WhatsApp thread and somebody's memory, and those three disagree."
  >
    <div className="mx-auto max-w-[900px]">
      <Panel className="p-7 sm:p-10">
        <p className="text-[15px] sm:text-[17px] leading-[1.6] text-gray-600">
          A notebook records that money is owed. It cannot tell you{' '}
          <strong className="font-medium text-[#121316]">who is overdue this week</strong>, how much
          is out in total, or which of your staff agreed the terms. Answering any of those means
          reading every page.
        </p>
        <div className="mt-6">
          <Pills items={['Who owes it', 'Against which unit', 'How much is left', 'When it is due', 'Every repayment', 'Who agreed it']} />
        </div>
      </Panel>
    </div>

    <Section heading="Why the notebook fails">
      <p>
        It also cannot be read by anyone but you. When you travel and somebody else is at the
        counter, the shop either stops giving credit or starts giving it blind — and both of those
        cost more than the paper saved.
      </p>
    </Section>

    <Section heading="What a debt record needs to hold">
      <p>
        A real customer with a phone number that works, the unit they bought tied to its IMEI, what
        was paid at the counter and what is left, when it falls due, and every repayment since with
        the date and who took it. Then two things a notebook writes identically and shouldn’t:
        whether your shop is carrying the debt or a third party financed it, and whether the
        customer walked out with the item or collects it when they finish paying.
      </p>
      <p>
        That last one matters more than it sounds. “Paid half, took the phone” and “paid half,
        phone still here” are completely different risks.
      </p>
    </Section>

    <Section heading="How to know who to chase, without reading anything">
      <p>
        Once debts are records rather than handwriting, the shop tells you what is overdue instead
        of waiting to be asked — the customer, the amount and the number to call. The total owed
        stays in front of you, so you always know how much of your capital is out with other
        people.
      </p>
    </Section>

    <Section heading="Can my staff see this?">
      <p>
        Only if you let them. Roles decide who sees what: a salesperson can serve a customer and
        take a repayment without ever seeing what a unit cost you or what your margins are. Either
        way, whoever agreed the debt is recorded against it.
      </p>
    </Section>

    <CallToAction line="Suite keeps every debt, repayment and due date in one place, and tells you who to call." />
  </PageShell>
);
