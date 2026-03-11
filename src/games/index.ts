import { type Game } from './types';
import wordle from './Wordle';
import trivia from './Trivia';
export type { Game };
import GamesComponent from './GamesComponent';
export { GamesComponent };

const games: Record<string, Game> = {
  wordle,
  trivia,
};

export default games;
