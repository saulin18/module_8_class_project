import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';

const renderWithRouter = () =>
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

describe('HomePage', () => {
  it('works', () => {
    renderWithRouter();
  });

  it('renders the main heading and navigation links', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Start playing')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('shows a pill for each available game', () => {
    renderWithRouter();
    expect(screen.getByText('Wordle')).toBeInTheDocument();
    expect(screen.getByText('Trivia')).toBeInTheDocument();
  });
});
