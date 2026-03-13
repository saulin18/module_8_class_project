import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Guesses } from './Guesses';
import { WordleContext } from '../context';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<WordleContext>{ui}</WordleContext>);

describe('Guesses', () => {
  it('renders the Guesses component', () => {
    renderWithProvider(<Guesses />);
    expect(
      document.querySelector('[data-testid="wordle-cell"]'),
    ).toBeInTheDocument();
  });

  it('renders 6 rows for guesses', () => {
    renderWithProvider(<Guesses />);
    const rows = document.querySelectorAll('.flex');
    expect(rows.length).toBe(6);
  });

  it('renders 5 cells per row', () => {
    renderWithProvider(<Guesses />);
    const cells = document.querySelectorAll('[data-testid="wordle-cell"]');
    expect(cells.length).toBe(30);
  });

  it('initializes all cells with empty letter and none state', () => {
    renderWithProvider(<Guesses />);
    const cells = document.querySelectorAll('[data-testid="wordle-cell"]');
    cells.forEach((cell) => {
      expect(cell).toHaveAttribute('data-state', 'none');
    });
  });
});
