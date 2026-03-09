import { useEffect, useRef, useState } from 'react';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import { WORDS_LENGTH } from './Guesses/utils/constants';

type KeyState = 'correct' | 'exist' | 'non-exist';
const STATE_PRIORITY: Record<KeyState, number> = {
  correct: 2,
  exist: 1,
  'non-exist': 0,
};
const WORD = 'hello';

const Wordle: React.FC = () => {
  const posRef = useRef<number>(0);
  const [keyStates, setKeyStates] = useState<Record<string, KeyState>>({});

  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      const key = e.key.toLowerCase();
      if (key >= 'a' && key <= 'z') {
        const pos = posRef.current;
        const newState: KeyState =
          WORD[pos]?.toLowerCase() === key
            ? 'correct'
            : WORD.toLowerCase().includes(key)
              ? 'exist'
              : 'non-exist';

        setKeyStates((prev) => {
          const current = prev[key];
          if (
            current !== undefined &&
            STATE_PRIORITY[current] >= STATE_PRIORITY[newState]
          ) {
            return prev;
          }
          return { ...prev, [key]: newState };
        });

        posRef.current = pos >= WORDS_LENGTH - 1 ? 0 : pos + 1;
      }
    };

    window.addEventListener('keydown', handleKeyDownEvent);
    return () => window.removeEventListener('keydown', handleKeyDownEvent);
  }, []);

  return (
    <div className="max-w-screen overflow-x-auto">
      <Keyboard keyStates={keyStates}>
        <Guesses />
      </Keyboard>
    </div>
  );
};
export default Wordle;
