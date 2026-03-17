import { useEffect } from 'react';
import { WordleContext } from './WordleContext';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import { useWordleDispatch, useWordleState } from './useWordle';
import { ScoreSubmit } from '#shared/components/index';
import { ROWS } from '#shared/constants';
import styles from './Wordle.module.css';

const WordleGame: React.FC = () => {
  const { addLetter, removeLetter, submitGuess, restartGame } =
    useWordleDispatch();
  const { gameStatus, word, currentRow } = useWordleState();

  const score =
    gameStatus !== 'playing'
      ? Math.round(((ROWS - currentRow) / ROWS) * 1000)
      : 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      const key = e.key;
      if (key === 'Enter') {
        submitGuess();
      } else if (key === 'Backspace') {
        removeLetter();
      } else if (
        key.length === 1 &&
        key.toLowerCase() >= 'a' &&
        key.toLowerCase() <= 'z'
      ) {
        addLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addLetter, removeLetter, submitGuess]);

  return (
    <div className="max-w-screen overflow-x-auto">
      {gameStatus === 'won' && (
        <div>
          <p className={styles['won']}>You won!</p>
          <ScoreSubmit gameSlug="wordle" score={score} onDone={restartGame} />
        </div>
      )}
      {gameStatus === 'lost' && (
        <div>
          <p className={styles['lost']}>Game over! The word was: {word}</p>
          <ScoreSubmit gameSlug="wordle" score={score} onDone={restartGame} />
        </div>
      )}
      {gameStatus === 'playing' && (
        <Keyboard>
          <Guesses />
        </Keyboard>
      )}
    </div>
  );
};

const Wordle: React.FC = () => (
  <WordleContext>
    <WordleGame />
  </WordleContext>
);

export default Wordle;
