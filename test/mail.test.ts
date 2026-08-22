import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { renderWaitlistConfirmation } from '../functions/_lib/mail.ts';

describe('waitlist confirmation email', () => {
  it('is a quiet confirmation, not a marketing email', () => {
    const email = renderWaitlistConfirmation({
      to: 'ada@example.com',
      name: 'Ada',
      shopName: 'Ada Gadgets',
    });

    assert.equal(email.subject, "You're on the Suite waitlist");
    assert.match(email.html, /You&#39;re on the list\./);
    assert.match(email.html, /Ada Gadgets/);
    assert.doesNotMatch(email.html, /<button|border-radius:20px|Start now|Book a demo/i);
    assert.match(email.text, /onboard every business personally/i);
  });

  it('escapes names supplied through the public form', () => {
    const email = renderWaitlistConfirmation({
      to: 'ada@example.com',
      name: '<script>Ada</script>',
      shopName: 'Phones & More',
    });

    assert.doesNotMatch(email.html, /<script>/);
    assert.match(email.html, /&lt;script&gt;Ada&lt;\/script&gt;/);
    assert.match(email.html, /Phones &amp; More/);
  });

});
