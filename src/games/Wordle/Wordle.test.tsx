import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Wordle from './Wordle';

describe('Wordle Game', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the Wordle game component', () => {
    render(<Wordle />);
    expect(document.querySelector('.max-w-screen')).toBeInTheDocument();
  });

  it('renders the Guesses component', () => {
    render(<Wordle />);
    expect(document.querySelector('.box')).toBeInTheDocument();
  });

  it('renders the Keyboard component', () => {
    render(<Wordle />);
    expect(document.querySelector('.whole-keyboard')).toBeInTheDocument();
  });

  it('shows letters in the grid as they are typed', () => {
    render(<Wordle />);

    fireEvent.keyDown(window, { key: 'a' });

    const cells = document.querySelectorAll('.box');
    expect(cells[0].textContent).toBe('A');
  });

  it('does not handle keys when alt, ctrl, meta or shift is pressed', () => {
    render(<Wordle />);

    fireEvent.keyDown(window, { key: 'a', altKey: true });
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true });
    fireEvent.keyDown(window, { key: 'c', metaKey: true });
    fireEvent.keyDown(window, { key: 'd', shiftKey: true });

    const cells = document.querySelectorAll('.box');
    expect(cells[0].textContent).toBe('');
  });

  it('updates keyboard key states after submitting a guess', () => {
    render(<Wordle />);

    // Type 'hello' (the answer) and submit
    fireEvent.keyDown(window, { key: 'h' });
    fireEvent.keyDown(window, { key: 'e' });
    fireEvent.keyDown(window, { key: 'l' });
    fireEvent.keyDown(window, { key: 'l' });
    fireEvent.keyDown(window, { key: 'o' });
    fireEvent.keyDown(window, { key: 'Enter' });

    const usedButtons = document.querySelectorAll('button[class*="used-"]');
    expect(usedButtons.length).toBeGreaterThan(0);
  });

  it('removes a letter when Backspace is pressed', () => {
    render(<Wordle />);

    fireEvent.keyDown(window, { key: 'a' });
    fireEvent.keyDown(window, { key: 'Backspace' });

    const cells = document.querySelectorAll('.box');
    expect(cells[0].textContent).toBe('');
  });

  it('shows a win message when the correct word is guessed', () => {
    render(<Wordle />);

    fireEvent.keyDown(window, { key: 'h' });
    fireEvent.keyDown(window, { key: 'e' });
    fireEvent.keyDown(window, { key: 'l' });
    fireEvent.keyDown(window, { key: 'l' });
    fireEvent.keyDown(window, { key: 'o' });
    fireEvent.keyDown(window, { key: 'Enter' });

    expect(document.body.textContent).toContain('You won!');
  });
});
