import { Link } from 'react-router';
import styles from './LeaderboardList.module.css';
import { useAllLeaderboards } from './useLeaderboard';

export const LeaderboardList: React.FC = () => {
  const gamesWithScores = useAllLeaderboards();

  return (
    <>
      <h1>Leaderboard</h1>
      {Object.entries(gamesWithScores).map(([gameSlug, scores]) => (
        <div key={gameSlug} className={styles.list}>
          <h2>
            <Link to={`/leaderboard/${gameSlug}`}>{gameSlug}</Link>
          </h2>
          <ol>
            {scores.map((score, index) => (
              <li key={index}>
                {score.playerName}: {score.score}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </>
  );
};
