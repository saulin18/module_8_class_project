import { Link } from 'react-router';
import games from './';

export const GamesGrid: React.FC = () => {
  return (
    <div className="games-grid">
      {Object.entries(games).map(([slug, game]) => (
        <Link key={slug} to={`/play/${slug}`} className="game-card">
          <div className="game-card-icon">{game.title[0]}</div>
          <h2 className="game-card-title">{game.title}</h2>
          <span className="game-card-cta">Play now →</span>
        </Link>
      ))}
    </div>
  );
};
