export interface WaitlistSubmission {
  email: string;
  name?: string;
  phone?: string;
  shopName?: string;
  note?: string;
  source: string;
  website?: string;
}

export const submitWaitlist = async (submission: WaitlistSubmission): Promise<void> => {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(submission),
  });
  if (response.ok) return;
  const body = (await response.json().catch(() => ({}))) as { error?: string };
  throw new Error(body.error ?? 'We could not save that just now. Please try again.');
};
