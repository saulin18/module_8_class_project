import { simulateKeyDown } from './utils';

interface Props {
  letter: string;
  className: string;
}

export const Key: React.FC<Props> = ({ letter, className }) => {
  return (
    <button className={className} onClick={() => simulateKeyDown(letter)}>
      {letter === 'Backspace' ? '<--' : letter}
    </button>
  );
};
