import { useEffect } from 'react';
import { WordleProvider } from './context/WordleContext';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import { useWordleDispatch, useWordleState } from './context/useWordle';

const WordleGame: React.FC = () => {
  const { addLetter, removeLetter, submitGuess } = useWordleDispatch();
  const { gameStatus, word } = useWordleState();

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
        <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'green' }}>
          You won!
        </p>
      )}
      {gameStatus === 'lost' && (
        <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}>
          Game over! The word was: {word}
        </p>
      )}
      <Keyboard>
        <Guesses />
      </Keyboard>
    </div>
  );
};

const Wordle: React.FC = () => (
  <WordleProvider>
    <WordleGame />
  </WordleProvider>
);

export default Wordle;
