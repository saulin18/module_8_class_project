import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Keyboard } from './Keyboard';
import { WordleProvider } from '../context/WordleContext';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<WordleProvider>{ui}</WordleProvider>);

describe('Keyboard', () => {
  it('renders the Keyboard component', () => {
    renderWithProvider(
      <Keyboard>
        <div>Children</div>
      </Keyboard>,
    );
    expect(document.querySelector('.flex')).toBeInTheDocument();
  });

  it('renders children components', () => {
    renderWithProvider(
      <Keyboard>
        <div data-testid="children">Test Children</div>
      </Keyboard>,
    );
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('renders keyboard keys from KEYBOARD constant', () => {
    renderWithProvider(
      <Keyboard>
        <div />
      </Keyboard>,
    );

    const buttons = document.querySelectorAll(
      '.keys-1 button, .keys-2 button, .whole-keyboard button',
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders Enter and Backspace keys in the mobile keyboard', () => {
    renderWithProvider(
      <Keyboard>
        <div />
      </Keyboard>,
    );

    const allButtons = Array.from(
      document.querySelectorAll('.whole-keyboard button'),
    );
    const labels = allButtons.map((b) => b.textContent);
    expect(labels).toContain('Enter');
    expect(labels).toContain('Backspace');
  });
});
