import { useState } from 'react';
import { initState } from './utils/initialState';
import type { GuessGrid } from './types';
import { CellComponent } from './Cell';

export const Guesses: React.FC = () => {
  const [guesses] = useState<GuessGrid>(() => initState());

  return (
    <div>
      {guesses.map((word, index) => (
        <div key={index} className="flex">
          {word.map((cell, i) => (
            <CellComponent
              letter={cell.letter}
              state={cell.state}
              key={`${cell.letter}-${i}-${index}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
