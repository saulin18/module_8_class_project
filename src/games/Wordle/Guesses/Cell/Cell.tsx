import type { Cell } from '#shared/types';

export const CellComponent: React.FC<Cell> = ({ letter, state }) => {
  return <div className={`box ${state}`}>{letter}</div>;
};
