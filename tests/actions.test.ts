import { describe, it, expect, vi } from 'vitest';

vi.mock('../lib/db', () => ({
  supabaseServer: {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: { solution_regex: '^answer$' } })
        })
      })
    })
  }
}));

import { validateSubmission } from '../lib/actions';

describe('validateSubmission', () => {
  it('validates correct answer', async () => {
    const res = await validateSubmission('demo', 'answer');
    expect(res.correct).toBe(true);
  });
});
