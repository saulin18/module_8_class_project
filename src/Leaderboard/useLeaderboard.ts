import { useState } from 'react';
import { loadLeaderboardData, getStoredScores } from '../shared/storage';
import type { Score } from '../shared/types';

/** Returns scores for all games, keyed by game slug. */
export function useAllLeaderboards(): Record<string, Score[]> {
  const [data] = useState(() => loadLeaderboardData());
  return data;
}

/** Returns the score list for a specific game slug, or undefined if no slug provided. */
export function useGameLeaderboard(
  gameSlug: string | undefined,
): Score[] | undefined {
  const [scores] = useState(() =>
    gameSlug !== undefined ? getStoredScores(gameSlug) : undefined,
  );
  return scores;
}
