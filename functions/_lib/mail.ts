interface MailEnvironment {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  SMTP_FROM_EMAIL?: string;
  SMTP_SENDER_NAME?: string;
}

export interface WaitlistConfirmation {
  to: string;
  name: string | null;
  shopName: string | null;
}

interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

export const renderWaitlistConfirmation = (input: WaitlistConfirmation): RenderedEmail => {
  const greeting = input.name === null ? 'Hi,' : `Hi ${input.name},`;
  const shopLine = input.shopName === null
    ? 'We have your details and will contact you to understand how your business works.'
    : `We have your details for ${input.shopName} and will contact you to understand how your business works.`;
  const subject = "You're on the Suite waitlist";
  const text = [
    greeting,
    '',
    "You're on the Suite waitlist.",
    shopLine,
    '',
    'We onboard every business personally. When it is your turn, we will arrange your setup with you.',
    '',
    'Suite',
    'A Copper Ledger product · suite.ng',
  ].join('\n');

  return {
    subject,
    text,
    html: quietFrame({
      preheader: "You're on the Suite waitlist.",
      title: "You're on the list.",
      copy: `${escapeHtml(greeting)}<br><br>${escapeHtml(shopLine)}<br><br>We onboard every business personally. When it is your turn, we will arrange your setup with you.`,
    }),
  };
};

/** Cloudflare Pages talks directly to SES over implicit TLS on SMTP port 465. */
export const sendWaitlistConfirmation = async (
  env: MailEnvironment,
  input: WaitlistConfirmation,
): Promise<boolean> => {
  const port = Number(env.SMTP_PORT ?? '465');
  if (
    env.SMTP_HOST === undefined || env.SMTP_USER === undefined
    || env.SMTP_PASSWORD === undefined || env.SMTP_FROM_EMAIL === undefined
    || !Number.isInteger(port) || port !== 465
  ) return false;

  try {
    const { connect } = await import('cloudflare:sockets');
    const socket = connect(
      { hostname: env.SMTP_HOST, port },
      { secureTransport: 'on', allowHalfOpen: false },
    );
    await socket.opened;
    const reader = socket.readable.getReader();
    const writer = socket.writable.getWriter();
    const smtp = smtpConversation(reader, writer);
    const fromName = cleanHeader(env.SMTP_SENDER_NAME ?? 'Suite');
    const fromEmail = requireMailbox(env.SMTP_FROM_EMAIL);
    const to = requireMailbox(input.to);
    const email = renderWaitlistConfirmation(input);

    try {
      await smtp.expect(220);
      await smtp.command('EHLO suite.ng', 250);
      await smtp.command('AUTH LOGIN', 334);
      await smtp.command(base64(env.SMTP_USER), 334);
      await smtp.command(base64(env.SMTP_PASSWORD), 235);
      await smtp.command(`MAIL FROM:<${fromEmail}>`, 250);
      await smtp.command(`RCPT TO:<${to}>`, 250);
      await smtp.command('DATA', 354);
      await smtp.data(mimeMessage({ fromName, fromEmail, to, email }), 250);
      await smtp.command('QUIT', 221);
      return true;
    } finally {
      reader.releaseLock();
      writer.releaseLock();
      await socket.close().catch(() => undefined);
    }
  } catch {
    return false;
  }
};

const smtpConversation = (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  writer: WritableStreamDefaultWriter<Uint8Array>,
) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffered = '';

  const line = async (): Promise<string> => {
    while (!buffered.includes('\n')) {
      const next = await reader.read();
      if (next.done) throw new Error('SMTP connection ended early');
      buffered += decoder.decode(next.value, { stream: true });
    }
    const newline = buffered.indexOf('\n');
    const value = buffered.slice(0, newline).replace(/\r$/, '');
    buffered = buffered.slice(newline + 1);
    return value;
  };

  const expect = async (wanted: number): Promise<void> => {
    for (;;) {
      const response = await line();
      const code = Number(response.slice(0, 3));
      if (code !== wanted) throw new Error('SMTP request refused');
      if (response[3] !== '-') return;
    }
  };

  const write = async (value: string): Promise<void> => {
    await writer.write(encoder.encode(value));
  };

  return {
    expect,
    async command(value: string, wanted: number): Promise<void> {
      await write(`${value}\r\n`);
      await expect(wanted);
    },
    async data(value: string, wanted: number): Promise<void> {
      await write(`${value.replace(/^\./gm, '..')}\r\n.\r\n`);
      await expect(wanted);
    },
  };
};

const mimeMessage = (input: {
  fromName: string;
  fromEmail: string;
  to: string;
  email: RenderedEmail;
}): string => {
  const boundary = `suite_${crypto.randomUUID().replace(/-/g, '')}`;
  return [
    `From: ${encodeHeader(input.fromName)} <${input.fromEmail}>`,
    `To: <${input.to}>`,
    `Subject: ${encodeHeader(input.email.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@suite.ng>`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(base64(input.email.text)),
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(base64(input.email.html)),
    `--${boundary}--`,
  ].join('\r\n');
};

const requireMailbox = (value: string): string => {
  const trimmed = value.trim().toLowerCase();
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i.test(trimmed)) {
    throw new Error('invalid mailbox');
  }
  return trimmed;
};

const cleanHeader = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim().slice(0, 120);
const encodeHeader = (value: string): string => `=?UTF-8?B?${base64(cleanHeader(value))}?=`;
const wrapBase64 = (value: string): string => value.match(/.{1,76}/g)?.join('\r\n') ?? '';
const base64 = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 8192) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
  }
  return btoa(binary);
};

const quietFrame = (input: { preheader: string; title: string; copy: string }): string => `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background:#f1f1ee;color:#171717;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(input.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f1f1ee">
    <tr><td align="center" style="padding:36px 14px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px">
        <tr><td style="background:#ffffff;border:1px solid #deded8;padding:38px 42px 32px">
          <p style="margin:0 0 52px;color:#171717;font-size:12px;line-height:16px;font-weight:800;letter-spacing:1.6px">SUITE</p>
          <h1 style="margin:0 0 20px;color:#171717;font-size:28px;line-height:34px;letter-spacing:-0.6px;font-weight:700">${escapeHtml(input.title)}</h1>
          <p style="margin:0;color:#4f4f4b;font-size:15px;line-height:24px">${input.copy}</p>
          <p style="margin:64px 0 0;color:#8a8a85;font-size:11px;line-height:17px">suite.ng &nbsp;·&nbsp; A Copper Ledger product</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const escapeHtml = (value: string): string => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
})[character] ?? character);
