import { useCallback, useState } from 'react';
import {
  WordleDispatchContext,
  WordleStateContext,
  type WordleState,
} from './WordleProvider';
import { ROWS, WORDS_LENGTH } from '#shared/constants';
import { initState } from '#shared/initialState';

export type CellState = 'correct' | 'exist' | 'non-exist' | 'none';
export type KeyState = 'correct' | 'exist' | 'non-exist';

const STATE_PRIORITY: Record<KeyState, number> = {
  correct: 2,
  exist: 1,
  'non-exist': 0,
};

const WORD = 'HELLO';

function evaluateGuess(word: string, guessLetters: string[]): CellState[] {
  const wordUpper = word.toUpperCase();
  const result: CellState[] = new Array(WORDS_LENGTH).fill('none');
  const wordLetters = wordUpper.split('');
  const wordMatched = new Array(WORDS_LENGTH).fill(false);
  const guessMatched = new Array(WORDS_LENGTH).fill(false);

  for (let i = 0; i < WORDS_LENGTH; i++) {
    if (guessLetters[i] === wordLetters[i]) {
      result[i] = 'correct';
      wordMatched[i] = true;
      guessMatched[i] = true;
    }
  }

  for (let i = 0; i < WORDS_LENGTH; i++) {
    if (guessMatched[i]) continue;
    const foundIndex = wordLetters.findIndex(
      (l, j) => !wordMatched[j] && l === guessLetters[i],
    );
    if (foundIndex !== -1) {
      result[i] = 'exist';
      wordMatched[foundIndex] = true;
    } else {
      result[i] = 'non-exist';
    }
  }

  return result;
}

export const WordleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<WordleState>({
    guesses: initState(),
    currentRow: 0,
    currentCol: 0,
    gameStatus: 'playing',
    keyStates: {},
    word: WORD,
  });

  const addLetter = useCallback((letter: string) => {
    setState((prev) => {
      if (prev.gameStatus !== 'playing') return prev;
      if (prev.currentCol >= WORDS_LENGTH) return prev;

      const newGuesses = prev.guesses.map((row) =>
        row.map((cell) => ({ ...cell })),
      );
      newGuesses[prev.currentRow][prev.currentCol] = {
        letter: letter.toUpperCase(),
        state: 'none',
      };

      return { ...prev, guesses: newGuesses, currentCol: prev.currentCol + 1 };
    });
  }, []);

  const removeLetter = useCallback(() => {
    setState((prev) => {
      if (prev.gameStatus !== 'playing') return prev;
      if (prev.currentCol <= 0) return prev;

      const newGuesses = prev.guesses.map((row) =>
        row.map((cell) => ({ ...cell })),
      );
      newGuesses[prev.currentRow][prev.currentCol - 1] = {
        letter: '',
        state: 'none',
      };

      return { ...prev, guesses: newGuesses, currentCol: prev.currentCol - 1 };
    });
  }, []);

  const restartGame = useCallback(() => {
    setState({
      guesses: initState(),
      currentRow: 0,
      currentCol: 0,
      gameStatus: 'playing',
      keyStates: {},
      word: WORD,
    });
  }, []);

  const submitGuess = useCallback(() => {
    setState((prev) => {
      if (prev.gameStatus !== 'playing') return prev;
      if (prev.currentCol < WORDS_LENGTH) return prev;

      const currentRow = prev.guesses[prev.currentRow];
      const guessLetters = currentRow.map((c) => c.letter);
      const cellStates = evaluateGuess(prev.word, guessLetters);

      const newGuesses = prev.guesses.map((row, i) =>
        i === prev.currentRow
          ? row.map((cell, j) => ({ ...cell, state: cellStates[j] }))
          : row,
      );

      const newKeyStates = { ...prev.keyStates };
      currentRow.forEach((cell, i) => {
        const key = cell.letter.toLowerCase();
        const newState = cellStates[i] as CellState;
        if (newState === 'none') return;
        const current = newKeyStates[key];
        if (
          !current ||
          STATE_PRIORITY[current as KeyState] < STATE_PRIORITY[newState]
        ) {
          newKeyStates[key] = newState;
        }
      });

      const isWon = cellStates.every((s) => s === 'correct');
      const isLost = !isWon && prev.currentRow >= ROWS - 1;

      return {
        ...prev,
        guesses: newGuesses,
        currentRow: isWon || isLost ? prev.currentRow : prev.currentRow + 1,
        currentCol: 0,
        gameStatus: isWon ? 'won' : isLost ? 'lost' : 'playing',
        keyStates: newKeyStates,
      };
    });
  }, []);

  return (
    <WordleStateContext.Provider value={state}>
      <WordleDispatchContext.Provider
        value={{ addLetter, removeLetter, submitGuess, restartGame }}
      >
        {children}
      </WordleDispatchContext.Provider>
    </WordleStateContext.Provider>
  );
};
