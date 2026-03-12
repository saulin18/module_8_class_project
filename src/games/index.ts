import { type Game } from './types';
import wordle from './Wordle';
import trivia from './Trivia';
export type { Game };
export { GamesComponent } from './GamesComponent';
export { GamesGrid } from './GamesGrid';

const games: Record<string, Game> = {
  wordle,
  trivia,
};

export default games;
