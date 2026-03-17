import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Guesses } from './Guesses';
import { WordleContext } from '../WordleContext';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<WordleContext>{ui}</WordleContext>);

describe('Guesses', () => {
  it('renders the Guesses component', () => {
    renderWithProvider(<Guesses />);
    expect(document.querySelector('.box')).toBeInTheDocument();
  });

  it('renders 6 rows for guesses', () => {
    renderWithProvider(<Guesses />);
    const rows = document.querySelectorAll('.flex');
    expect(rows.length).toBe(6);
  });

  it('renders 5 cells per row', () => {
    renderWithProvider(<Guesses />);
    const cells = document.querySelectorAll('.box');
    expect(cells.length).toBe(30);
  });

  it('initializes all cells with empty letter and none state', () => {
    renderWithProvider(<Guesses />);
    const cells = document.querySelectorAll('.box');
    cells.forEach((cell) => {
      expect(cell).toHaveClass('none');
    });
  });
});
