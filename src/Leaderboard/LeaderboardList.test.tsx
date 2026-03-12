import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import LeaderboardList from './LeaderboardList';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('LeaderboardList', () => {
  it('renders the Leaderboard title', () => {
    renderWithRouter(<LeaderboardList />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('renders ordered lists for scores', () => {
    renderWithRouter(<LeaderboardList />);

    const orderedLists = document.querySelectorAll('ol');
    expect(orderedLists.length).toBe(0);
  });
});
