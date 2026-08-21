/** Public, same-origin waitlist intake for suite.ng. */
import { sendWaitlistConfirmation } from '../_lib/mail.ts';

interface D1Statement {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<unknown>;
}

interface D1Binding {
  prepare: (sql: string) => D1Statement;
}

interface Context {
  request: Request;
  env: {
    'copper-ledger'?: D1Binding;
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASSWORD?: string;
    SMTP_FROM_EMAIL?: string;
    SMTP_SENDER_NAME?: string;
  };
}

type Input = Record<string, unknown>;

const json = (body: unknown, status = 200): Response => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
});

const clean = (input: Input, key: string, max: number): string | null | 'invalid' => {
  const value = input[key];
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') return 'invalid';
  const trimmed = value.trim();
  if (trimmed.length > max) return 'invalid';
  return trimmed === '' ? null : trimmed;
};

const validEmail = (email: string): boolean => {
  if (email.length > 254 || /\.\.|[\s<>(),;:\\"\[\]]/.test(email)) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local = '', domain = ''] = parts;
  if (local.length < 1 || local.length > 64 || domain.length > 189
    || local.startsWith('.') || local.endsWith('.')) return false;
  return /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)
    && /^(?=.{3,189}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(domain);
};

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  if ((origin !== null && origin !== url.origin)
    || (fetchSite !== null && fetchSite !== 'same-origin' && fetchSite !== 'none')) {
    return json({ error: 'Request not allowed.' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (!Number.isFinite(contentLength) || contentLength > 4096) {
    return json({ error: 'That request is too large.' }, 413);
  }

  let input: Input;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return json({ error: 'That request is too large.' }, 413);
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error();
    input = parsed as Input;
  } catch {
    return json({ error: 'Send valid form details.' }, 400);
  }

  // Bots fill fields hidden from people. Answer success so the trap does not
  // teach them how to bypass it, but never put the submission in D1.
  const website = clean(input, 'website', 200);
  if (website === 'invalid') return json({ error: 'Send valid form details.' }, 400);
  if (website !== null) return json({ ok: true });

  const emailValue = clean(input, 'email', 254);
  const name = clean(input, 'name', 120);
  const phone = clean(input, 'phone', 32);
  const shopName = clean(input, 'shopName', 160);
  const note = clean(input, 'note', 500);
  const source = clean(input, 'source', 64);
  if ([emailValue, name, phone, shopName, note, source].includes('invalid')) {
    return json({ error: 'One of those details is too long or malformed.' }, 400);
  }

  const email = typeof emailValue === 'string' ? emailValue.toLowerCase() : '';
  if (!validEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);
  if (typeof phone === 'string' && !/^[+()0-9 .-]{7,32}$/.test(phone)) {
    return json({ error: 'Enter a valid phone number.' }, 400);
  }
  if (typeof source === 'string' && !/^[a-z0-9][a-z0-9_-]*$/.test(source)) {
    return json({ error: 'Send valid form details.' }, 400);
  }

  const db = env['copper-ledger'];
  if (db === undefined) {
    console.error('waitlist intake: copper-ledger D1 binding is missing');
    return json({ error: 'We could not save that just now. Please try again.' }, 500);
  }

  try {
    await db.prepare(
      `INSERT INTO waitlist (id, email, name, phone, shop_name, note, source)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(email) WHERE archived_at IS NULL DO UPDATE SET
         name = coalesce(excluded.name, waitlist.name),
         phone = coalesce(excluded.phone, waitlist.phone),
         shop_name = coalesce(excluded.shop_name, waitlist.shop_name),
         note = coalesce(excluded.note, waitlist.note),
         source = coalesce(excluded.source, waitlist.source)`,
    ).bind(
      `wait_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`,
      email,
      name,
      phone,
      shopName,
      note,
      source ?? 'suite-site',
    ).run();
    const delivered = await sendWaitlistConfirmation(env, {
      to: email,
      name,
      shopName,
    });
    if (!delivered && env.SMTP_HOST !== undefined) {
      console.error('waitlist confirmation delivery failed');
    }
    return json({ ok: true });
  } catch (error) {
    console.error('waitlist intake failed', error);
    return json({ error: 'We could not save that just now. Please try again.' }, 500);
  }
};
