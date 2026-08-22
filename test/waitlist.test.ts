import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { onRequestPost } from '../functions/api/waitlist.ts';

interface Row {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  shopName: string | null;
  note: string | null;
  source: string | null;
}

class Statement {
  private values: unknown[] = [];
  private readonly db: MemoryD1;
  private readonly sql: string;

  constructor(db: MemoryD1, sql: string) {
    this.db = db;
    this.sql = sql;
  }

  bind(...values: unknown[]): Statement {
    this.values = values;
    return this;
  }

  async run(): Promise<void> {
    assert.match(this.sql, /INSERT INTO waitlist/);
    this.db.upsert(this.values);
  }
}

class MemoryD1 {
  readonly rows = new Map<string, Row>();

  prepare(sql: string): Statement {
    return new Statement(this, sql);
  }

  upsert(values: unknown[]): void {
    const [id, email, name, phone, shopName, note, source] = values as [
      string, string, string | null, string | null, string | null, string | null, string | null,
    ];
    const prior = this.rows.get(email);
    this.rows.set(email, prior === undefined ? {
      id, email, name, phone, shopName, note, source,
    } : {
      ...prior,
      name: name ?? prior.name,
      phone: phone ?? prior.phone,
      shopName: shopName ?? prior.shopName,
      note: note ?? prior.note,
      source: source ?? prior.source,
    });
  }
}

const submit = (db: MemoryD1, body: Record<string, unknown>): Promise<Response> =>
  onRequestPost({
    request: new Request('https://suite.ng/api/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://suite.ng' },
      body: JSON.stringify(body),
    }),
    env: { 'copper-ledger': db },
  });

describe('POST /api/waitlist', () => {
  it('rejects a malformed email without writing a row', async () => {
    const db = new MemoryD1();
    const response = await submit(db, { email: 'not-an-email', source: 'hero' });

    assert.equal(response.status, 400);
    assert.equal(db.rows.size, 0);
  });

  it('accepts and trims a valid submission', async () => {
    const db = new MemoryD1();
    const response = await submit(db, {
      email: '  Ada@Example.com ',
      name: '  Ada  ',
      phone: ' 0803 123 4567 ',
      shopName: '  Ada Gadgets ',
      source: 'signup-modal',
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(db.rows.get('ada@example.com')?.name, 'Ada');
    assert.equal(db.rows.get('ada@example.com')?.shopName, 'Ada Gadgets');
  });

  it('is idempotent and enriches the active row on a repeat submission', async () => {
    const db = new MemoryD1();
    assert.equal((await submit(db, { email: 'ada@example.com', source: 'hero' })).status, 200);
    assert.equal((await submit(db, {
      email: 'ADA@example.com',
      phone: '+234 803 123 4567',
      shopName: 'Ada Gadgets',
      source: 'signup-modal',
    })).status, 200);

    assert.equal(db.rows.size, 1);
    assert.equal(db.rows.get('ada@example.com')?.phone, '+234 803 123 4567');
    assert.equal(db.rows.get('ada@example.com')?.shopName, 'Ada Gadgets');
  });
});
