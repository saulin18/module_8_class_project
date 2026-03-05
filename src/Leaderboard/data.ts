export type Score = {
  playerName: string;
  score: number;
};

export type GameLeaderboard = {
  gameSlug: string;
  gameTitle: string;
  scores: Score[];
};

const mockLeaderboardData: GameLeaderboard[] = [
  {
    gameSlug: 'wordle',
    gameTitle: 'Wordle',
    scores: [
      { playerName: 'Alice', score: 1000 },
      { playerName: 'Bob', score: 950 },
      { playerName: 'Charlie', score: 900 },
      { playerName: 'Diana', score: 850 },
      { playerName: 'Eve', score: 800 },
      { playerName: 'Frank', score: 750 },
      { playerName: 'Grace', score: 700 },
      { playerName: 'Henry', score: 650 },
      { playerName: 'Ivy', score: 600 },
      { playerName: 'Jack', score: 550 },
    ],
  },
  {
    gameSlug: 'tetris',
    gameTitle: 'Tetris',
    scores: [
      { playerName: 'ProGamer', score: 50000 },
      { playerName: 'BlockMaster', score: 45000 },
      { playerName: 'RowClear', score: 40000 },
      { playerName: 'SpeedStack', score: 35000 },
      { playerName: 'LineKing', score: 30000 },
      { playerName: 'TetrisPro', score: 25000 },
      { playerName: 'FallDown', score: 20000 },
      { playerName: 'RotateRight', score: 15000 },
      { playerName: 'GridHero', score: 10000 },
      { playerName: 'ShapeFit', score: 5000 },
    ],
  },
  {
    gameSlug: 'pong',
    gameTitle: 'Pong',
    scores: [
      { playerName: 'PaddleKing', score: 99 },
      { playerName: 'BallBounce', score: 95 },
      { playerName: 'TableTennis', score: 90 },
      { playerName: 'RetroGamer', score: 85 },
      { playerName: 'PixelPlayer', score: 80 },
      { playerName: 'AIBeater', score: 75 },
      { playerName: 'ScoreChaser', score: 70 },
      { playerName: 'RallyMaster', score: 65 },
      { playerName: 'MatchPoint', score: 60 },
      { playerName: 'WinnerTake', score: 55 },
    ],
  },
];

export function getAllGamesWithTopScores(): GameLeaderboard[] {
  return mockLeaderboardData.map((game) => ({
    ...game,
    scores: game.scores.slice(0, 3),
  }));
}

export function getGameLeaderboard(
  gameSlug: string,
): GameLeaderboard | undefined {
  const game = mockLeaderboardData.find((g) => g.gameSlug === gameSlug);
  if (!game) return undefined;
  return {
    ...game,
    scores: game.scores.slice(0, 10),
  };
}
