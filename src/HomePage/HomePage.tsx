import { Link } from 'react-router';
import games from '../games';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const gameCount = Object.keys(games).length;

  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <div className="home-badge">{gameCount} games available</div>
        <h1 className="home-title">
          Game<span className="home-title-accent">Hub</span>
        </h1>
        <p className="home-subtitle">
          Pick a game, beat the leaderboard, repeat.
        </p>
        <div className="home-actions">
          <Link to="/play" className="home-cta-primary">
            Start playing
          </Link>
          <Link to="/leaderboard" className="home-cta-secondary">
            Leaderboard
          </Link>
        </div>
      </div>

      <div className="home-cards">
        {Object.entries(games).map(([slug, game]) => (
          <Link key={slug} to={`/play/${slug}`} className="home-game-pill">
            <span className="home-game-pill-icon">{game.title[0]}</span>
            {game.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
