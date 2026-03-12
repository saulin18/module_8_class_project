import { Link } from 'react-router';
import './LeaderboardList.css';
import { loadLeaderboardData } from '../shared/storage';

const LeaderboardList: React.FC = () => {
  const gamesWithScores = loadLeaderboardData();

  return (
    <>
      <h1>Leaderboard</h1>
      {Object.entries(gamesWithScores).map(([gameSlug, scores]) => (
        <div key={gameSlug} className="list">
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

export default LeaderboardList;
