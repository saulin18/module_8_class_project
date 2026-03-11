import { describe, it, expect, vi, afterEach } from 'vitest';
import { getQuestions } from './api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getQuestions', () => {
  it('is a function', () => {
    expect(typeof getQuestions).toBe('function');
  });

  it('returns decoded questions on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            response_code: 0,
            results: [
              {
                category: 'Science',
                type: 'multiple',
                difficulty: 'easy',
                question: 'What is H&amp;2O?',
                correct_answer: 'Water',
                incorrect_answers: ['Fire', 'Air', 'Earth'],
              },
            ],
          }),
      }),
    );

    const questions = await getQuestions();
    expect(questions).toHaveLength(1);
    expect(questions[0].correct_answer).toBe('Water');
  });

  it('throws when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 429 }),
    );

    await expect(getQuestions()).rejects.toThrow('Network error: 429');
  });
});
