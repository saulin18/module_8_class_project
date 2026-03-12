import { Link, useParams } from 'react-router';
import { useGameLeaderboard } from './useLeaderboard';

export const LeaderboardDetail: React.FC = () => {
  const { slug } = useParams();
  const leaderboard = useGameLeaderboard(slug);

  if (!leaderboard) {
    return (
      <>
        <h1>Error</h1>
        <p>Cannot find leaderboard for {slug}.</p>
        <p>
          <Link to="/leaderboard">Go to Leaderboards</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Leaderboard</h1>
      <ol>
        {leaderboard.map((score, index) => (
          <li key={index}>
            {score.playerName}: {score.score}
          </li>
        ))}
      </ol>
      <p>
        <Link to="/leaderboard">Back to all leaderboards</Link>
      </p>
    </>
  );
};
