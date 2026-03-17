import type React from 'react';
import { KEYBOARD } from './constants';
import styles from './Keyboard.module.css';
import { Key } from './Key';
import { useWordleState } from '../useWordle';

interface Props {
  children: React.ReactNode;
}

export const Keyboard: React.FC<Props> = ({ children }) => {
  const { keyStates } = useWordleState();
  const createClassName = (letter: string) => {
    const state = keyStates[letter.toLowerCase()];
    return state ? (styles[`used-${state}`] ?? '') : '';
  };

  return (
    <div className="flex gap-5">
      <div className={styles['keys-1']}>
        {KEYBOARD.filter((_, b) => b % 2 === 0).map((row, index) => (
          <div key={`left-${index}`} className="flex justify-end">
            {row.map((letter, i) => {
              const className = createClassName(letter);
              return (
                <Key
                  key={`left-${letter}-${i}-${index}`}
                  letter={letter}
                  className={className}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles['guess-container']}>
        <div className={styles['scrollable-grid']}>{children}</div>
        <div className={styles['whole-keyboard']}>
          {KEYBOARD.reduce((acc: string[][], current, index) => {
            if (index % 2 === 0) {
              acc.push([...current, ...KEYBOARD[index + 1]]);
            }
            return acc;
          }, []).map((row, index) => (
            <div key={`center-${index}`} className="flex">
              {row.map((letter, i) => {
                const className =
                  `${styles.key} ${createClassName(letter)}`.trim();
                return (
                  <Key
                    key={`center-${letter}-${i}-${index}`}
                    letter={letter}
                    className={className}
                  />
                );
              })}
            </div>
          ))}
          <div className="flex">
            <Key
              letter="Backspace"
              className={`${styles.key} ${styles['key-wide']}`}
            />
            <Key
              letter="Enter"
              className={`${styles.key} ${styles['key-wide']}`}
            />
          </div>
        </div>
      </div>
      <div className={styles['keys-2']}>
        {KEYBOARD.filter((_, b) => b % 2 !== 0).map((row, index) => (
          <div key={`right-${index}`} className="flex justify-start">
            {row.map((letter, i) => {
              const className = createClassName(letter);
              return (
                <Key
                  key={`right-${letter}-${i}-${index}`}
                  letter={letter}
                  className={className}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
