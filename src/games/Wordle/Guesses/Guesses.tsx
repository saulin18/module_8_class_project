import { useWordleState } from '../useWordle';
import { CellComponent } from './Cell';

export const Guesses: React.FC = () => {
  const { guesses } = useWordleState();

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
