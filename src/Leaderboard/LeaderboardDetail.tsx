import { Link, useParams } from 'react-router';
import { getStoredScores } from '../shared/storage';

const LeaderboardDetail: React.FC = () => {
  const { slug } = useParams();
  const leaderboard = slug ? getStoredScores(slug) : undefined;

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

export default LeaderboardDetail;
