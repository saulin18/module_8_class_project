import { Link } from 'react-router';
import { getAllGamesWithTopScores } from './data';
import './LeaderboardList.css';

const LeaderboardList: React.FC = () => {
  const gamesWithScores = getAllGamesWithTopScores();

  return (
    <>
      <h1>Leaderboard</h1>
      {gamesWithScores.map((game) => (
        <div key={game.gameSlug} className="list">
          <h2>
            <Link to={`/leaderboard/${game.gameSlug}`}>{game.gameTitle}</Link>
          </h2>
          <ol>
            {game.scores.map((score, index) => (
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
