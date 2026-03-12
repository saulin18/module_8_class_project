export type CellState = 'correct' | 'exist' | 'non-exist' | 'none';
export type Cell = { letter: string; state: CellState };
export type GuessGrid = Array<Array<Cell>>;
export type Score = {
  playerName: string;
  score: number;
};

export type GameLeaderboard = {
  gameSlug: string;
  gameTitle: string;
  scores: Score[];
};
