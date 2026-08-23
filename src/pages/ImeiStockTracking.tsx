import { CallToAction, PageShell, Panel, Pills, Section, Steps } from './Shell.tsx';

export const ImeiStockTracking = () => (
  <PageShell
    title="How to track stock by IMEI"
    tail="or serial number."
    standfirst="A phone is not a bag of rice. Two units of the same model are different objects with different costs, different conditions and different owners — counting them as a quantity is where the money goes missing."
  >
    <div className="mx-auto max-w-[900px]">
      <Panel className="p-7 sm:p-10">
        <p className="text-[15px] sm:text-[17px] leading-[1.6] text-gray-600">
          A quantity says <strong className="font-medium text-[#121316]">4 × iPhone 13 Pro</strong>.
          Tracking by serial says which four, what each one cost, what condition it is in, how long
          it has been sitting, and which of them was a swap you took last week.
        </p>
        <div className="mt-6">
          <Pills items={['IMEI', 'Cost price', 'Condition', 'Battery health', 'Days in stock', 'Floor price', 'Who sold it']} />
        </div>
      </Panel>
    </div>

    <Section heading="Why counting by model does not work">
      <p>
        Most stock systems hold a line called “iPhone 13 Pro” with a quantity beside it. That works
        for cables. It fails for anything carrying a serial number, because the four units behind
        that number were bought on different days, at different prices, in different conditions.
      </p>
      <p>
        When one sells, a quantity-based system takes one off the count and tells you nothing about
        which one left. You cannot answer what it cost, what you made on it, who sold it, or
        whether the customer at the counter with a fault actually bought it from you.
      </p>
    </Section>

    <Section heading="What tracking by IMEI actually means">
      <p>
        Every unit is its own record, keyed to the number stamped on it — an IMEI for a phone, a
        serial for a laptop, console or inverter. Selling it moves that specific record to sold and
        attaches the sale, the customer and the receipt to it. A year later somebody walks in with
        a fault, you type the IMEI, and you see exactly what you sold them and when.
      </p>
    </Section>

    <Section heading="How to start with stock you already own">
      <p>
        Count what is on the shelf and enter it once. After that there is no second place stock can
        come from, which is what makes the count still true a month later.
      </p>
    </Section>

    <div className="mx-auto max-w-[1140px] pt-8">
      <Steps
        items={[
          {
            title: 'Bring your sheet in',
            body: 'A CSV out of Excel or Google Sheets. Suite reads your column names and shows you what it understood before anything is saved.',
          },
          {
            title: 'Duplicates are refused',
            body: 'The same IMEI cannot exist twice. If a unit is already booked in, you are told rather than given a second copy of it.',
          },
          {
            title: 'Everything after enters at intake',
            body: 'Stock arrives through intake and leaves through a sale, a swap or a supplier return. Nothing appears from anywhere else.',
          },
        ]}
      />
    </div>

    <Section heading="What it tells you once it is running">
      <p>
        The questions a quantity cannot answer become the ones you can ask at a glance: what every
        unit on the shelf cost you and what that is in total, which units have been sitting more
        than thirty days and are eating your capital, what you actually made today after expenses,
        whether a seller went below the floor price and who approved it.
      </p>
    </Section>

    <CallToAction line="Suite counts every unit one by one, from intake to sale." />
  </PageShell>
);
