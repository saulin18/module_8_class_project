import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import Trivia from './Trivia';
import * as api from './api';
import type { Question } from './api';

vi.mock('./api', () => ({
  getQuestions: vi.fn(),
}));

const mockQuestions: Question[] = [
  {
    category: 'Science',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What is 2 + 2?',
    correct_answer: '4',
    incorrect_answers: ['3', '5', '6'],
  },
];

beforeEach(() => {
  vi.mocked(api.getQuestions).mockResolvedValue(mockQuestions);
});

describe('Trivia', () => {
  it('shows loading state while fetching', () => {
    vi.mocked(api.getQuestions).mockReturnValue(new Promise(() => {}));
    render(<Trivia />);
    expect(screen.getByText('Loading questions…')).toBeInTheDocument();
  });

  it('renders questions after loading', async () => {
    await act(async () => {
      render(<Trivia />);
    });
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('shows error UI when fetch fails', async () => {
    vi.mocked(api.getQuestions).mockRejectedValue(
      new Error('Network error: 429'),
    );
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<Trivia />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading questions/)).toBeInTheDocument();
    });
    consoleError.mockRestore();
  });
});
