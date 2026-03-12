export type Cell = { letter: string; state: string };
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
