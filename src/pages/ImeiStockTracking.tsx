import { Bullets, CallToAction, PageShell, Section } from './Shell.tsx';

export const ImeiStockTracking = () => (
  <PageShell
    eyebrow="Stock control"
    title="How to track stock by IMEI or serial number"
    standfirst="A phone is not a bag of rice. Two units of the same model are different objects with different costs, different conditions and different owners — counting them as a quantity is where the money goes missing."
  >
    <Section heading="Why counting by model does not work">
      <p>
        Most stock systems hold a line called “iPhone 13 Pro” with a quantity beside it. That works
        for cables. It fails for anything carrying a serial number, because the four units behind
        that quantity were bought on different days, at different prices, in different conditions,
        and one of them is a swap you took in part-exchange last week.
      </p>
      <p>
        When a unit sells, a quantity-based system takes one off the number and tells you nothing
        about which one left. You cannot answer what it cost, what margin you made on it, who sold
        it, or whether the customer bringing it back for warranty actually bought it from you.
      </p>
    </Section>

    <Section heading="What tracking by IMEI actually means">
      <p>
        Every unit is its own record, keyed to the number stamped on it — an IMEI for a phone, a
        serial number for a laptop, console or inverter. That record carries:
      </p>
      <Bullets
        items={[
          'What you paid for it, and which supplier it came from',
          'The condition: sealed, open box, or a graded used unit',
          'Battery health, colour, storage and lock status where they apply',
          'How many days it has been sitting on your shelf',
          'The floor price nobody may sell below, and the target price you want',
          'Every price change since intake, and who made it',
        ]}
      />
      <p>
        Selling it moves that specific record to sold and attaches the sale, the customer and the
        receipt to it. A year later, someone walks in with a fault and you type the IMEI and see
        exactly what you sold them and when.
      </p>
    </Section>

    <Section heading="How to start tracking stock you already own">
      <p>
        Count what is on the shelf and enter it once. In Suite you can bring a spreadsheet in
        directly — a CSV exported from Excel or Google Sheets — and it will match your columns to
        the right fields and show you what it read before anything is saved. Duplicate IMEIs are
        flagged rather than accepted, so the same handset cannot exist twice.
      </p>
      <p>
        After that, every unit enters through intake and leaves through a sale, a swap or a
        supplier return. There is no second place stock can come from, which is what makes the
        count true a month later.
      </p>
    </Section>

    <Section heading="What it tells you once it is running">
      <Bullets
        items={[
          'What every unit on your shelf cost you, and what that is in total',
          'Which units have been sitting more than thirty days and are eating your capital',
          'What you actually made today, after expenses',
          'Whether a seller went below the floor price, and who approved it',
          'Which supplier sends you units that come back',
        ]}
      />
    </Section>

    <CallToAction line="Suite counts every unit one by one, from intake to sale, for ₦25,000 a month." />
  </PageShell>
);
