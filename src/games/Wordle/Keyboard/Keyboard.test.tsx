import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Keyboard } from './Keyboard';
import { WordleContext } from '../context';
import styles from './Keyboard.module.css';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<WordleContext>{ui}</WordleContext>);

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
      `.${styles['keys-1']} button, .${styles['keys-2']} button, .${styles['whole-keyboard']} button`,
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
      document.querySelectorAll(`.${styles['whole-keyboard']} button`),
    );
    const labels = allButtons.map((b) => b.textContent);
    expect(labels).toContain('↵');
    expect(labels).toContain('⌫');
  });
});
