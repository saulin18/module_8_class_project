import { createContext } from 'react';
import type { KeyState } from './WordleContext';
import type { GuessGrid } from '#shared/types';

export type WordleState = {
  guesses: GuessGrid;
  currentRow: number;
  currentCol: number;
  gameStatus: 'playing' | 'won' | 'lost';
  keyStates: Record<string, KeyState>;
  word: string;
};

export type WordleDispatch = {
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  restartGame: () => void;
};

export const WordleStateContext = createContext<WordleState | null>(null);
export const WordleDispatchContext = createContext<WordleDispatch | null>(null);
