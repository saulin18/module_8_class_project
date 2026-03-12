import type { Score } from './data';

const STORAGE_KEY = 'gamehub_leaderboard';

type StorageData = Record<string, Score[]>;

function load(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StorageData) : {};
  } catch {
    return {};
  }
}

function save(data: StorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveScore(
  gameSlug: string,
  playerName: string,
  score: number,
): void {
  const data = load();
  const scores = data[gameSlug] ?? [];
  scores.push({ playerName, score });
  scores.sort((a, b) => b.score - a.score);
  data[gameSlug] = scores.slice(0, 10);
  save(data);
}

export function getStoredScores(gameSlug: string): Score[] {
  return load()[gameSlug] ?? [];
}

export function hasStoredScores(gameSlug: string): boolean {
  return getStoredScores(gameSlug).length > 0;
}
