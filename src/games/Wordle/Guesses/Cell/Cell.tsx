import type { Cell } from '#shared/types';
import styles from './Cell.module.css';

export const CellComponent: React.FC<Cell> = ({ letter, state }) => {
  return (
    <div
      className={`${styles['box']} ${styles[state]}`}
      data-testid="wordle-cell"
      data-state={state}
    >
      {letter}
    </div>
  );
};
