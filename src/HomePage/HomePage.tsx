import { Link } from 'react-router';
import games from '../games';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const gameCount = Object.keys(games).length;

  return (
    <div className={styles['home-wrapper']}>
      <div className={styles['home-hero']}>
        <div className={styles['home-badge']}>{gameCount} games available</div>
        <h1 className={styles['home-title']}>
          Game<span className={styles['home-title-accent']}>Hub</span>
        </h1>
        <p className={styles['home-subtitle']}>
          Pick a game, beat the leaderboard, repeat.
        </p>
        <div className={styles['home-actions']}>
          <Link to="/play" className={styles['home-cta-primary']}>
            Start playing
          </Link>
          <Link to="/leaderboard" className={styles['home-cta-secondary']}>
            Leaderboard
          </Link>
        </div>
      </div>

      <div className={styles['home-cards']}>
        {Object.entries(games).map(([slug, game]) => (
          <Link
            key={slug}
            to={`/play/${slug}`}
            className={styles['home-game-pill']}
          >
            <span className={styles['home-game-pill-icon']}>
              {game.title[0]}
            </span>
            {game.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
