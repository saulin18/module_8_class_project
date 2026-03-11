import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TriviaGame } from './TriviaGame';
import type { Question } from './api';

const mockQuestions: Question[] = [
  {
    category: 'Science',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What is 2 + 2?',
    correct_answer: '4',
    incorrect_answers: ['3', '5', '6'],
  },
  {
    category: 'History',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Who was the first US president?',
    correct_answer: 'Washington',
    incorrect_answers: ['Lincoln', 'Jefferson', 'Adams'],
  },
];

describe('TriviaGame', () => {
  it('works', () => {
    render(<TriviaGame questions={mockQuestions} onRestart={vi.fn()} />);
  });

  it('renders the first question with progress indicator', () => {
    render(<TriviaGame questions={mockQuestions} onRestart={vi.fn()} />);
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('Question 1 / 2')).toBeInTheDocument();
  });

  it('marks the correct answer after selecting it', () => {
    render(<TriviaGame questions={mockQuestions} onRestart={vi.fn()} />);
    const correctBtn = screen.getByRole('button', { name: '4' });
    fireEvent.click(correctBtn);
    expect(correctBtn).toHaveClass('correct');
  });
});
