import type { Cell } from '#shared/types';

type Props = Cell & { className?: string };

export const CellComponent: React.FC<Props> = ({
  letter,
  state,
  className,
}) => {
  const resolvedClassName = className ?? `box ${state}`;
  return (
    <div
      className={resolvedClassName}
      data-testid="wordle-cell"
      data-state={state}
    >
      {letter}
    </div>
  );
};
