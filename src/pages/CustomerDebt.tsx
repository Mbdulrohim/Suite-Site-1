import { Bullets, CallToAction, PageShell, Section } from './Shell.tsx';

export const CustomerDebt = () => (
  <PageShell
    eyebrow="Customer credit"
    title="How to keep records of customers who owe you money"
    standfirst="Every shop sells on trust sometimes. The problem is never the trust — it is that the record of it lives in a notebook, a WhatsApp thread and somebody's memory, and those three disagree."
  >
    <Section heading="Why the notebook fails">
      <p>
        A notebook records that money is owed. It does not tell you who is overdue this week,
        how much is out in total, whether a part payment came in, or which of your staff agreed
        the terms. Answering any of those means reading every page.
      </p>
      <p>
        It also cannot be read by anyone but you. When you travel and someone else is at the
        counter, the shop either stops giving credit or starts giving it blind.
      </p>
    </Section>

    <Section heading="What a debt record needs to hold">
      <Bullets
        items={[
          'Who owes it — a real customer profile with a phone number that works',
          'What they bought, tied to the actual unit and its IMEI',
          'How much was paid at the counter and how much is outstanding',
          'When it falls due',
          'Every repayment since, with the date and who took it',
          'Whether the shop is carrying the debt, or a third party financed it',
          'Whether the customer walked out with the item or collects it on completion',
        ]}
      />
      <p>
        That last one matters more than it sounds. “Paid half, took the phone” and “paid half,
        phone still here” are completely different risks, and a notebook writes them the same way.
      </p>
    </Section>

    <Section heading="How to know who to chase, without reading anything">
      <p>
        Once debts are records rather than handwriting, the shop can tell you what is overdue
        instead of waiting to be asked. Suite raises it as soon as a due date passes, with the
        customer, the amount and the phone number to call, and it keeps the total owed in front of
        you so you always know how much of your capital is out with other people.
      </p>
    </Section>

    <Section heading="Can my staff see this?">
      <p>
        Only if you let them. Roles decide who sees what: a salesperson can serve a customer and
        take a repayment without ever seeing what a unit cost you or what your margins are. The
        person who agreed a debt is recorded against it either way.
      </p>
    </Section>

    <CallToAction line="Suite keeps every debt, repayment and due date in one place, and tells you who to call." />
  </PageShell>
);
