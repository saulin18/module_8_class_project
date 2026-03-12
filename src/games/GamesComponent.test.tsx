import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { GamesComponent } from './GamesComponent';

const renderAtPath = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/play" element={<GamesComponent />}>
          <Route path=":slug" element={<div>Game Outlet</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe('GamesComponent', () => {
  it('works', () => {
    renderAtPath('/play');
  });

  it('renders the outlet when navigated to a specific game', () => {
    renderAtPath('/play/wordle');
    expect(screen.getByText('Game Outlet')).toBeInTheDocument();
  });
});
