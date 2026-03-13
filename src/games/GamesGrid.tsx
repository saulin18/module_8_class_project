import { Link } from 'react-router';
import games from './';
import styles from './GamesComponent.module.css';

export const GamesGrid: React.FC = () => {
  return (
    <div className={styles['games-grid']}>
      {Object.entries(games).map(([slug, game]) => (
        <Link key={slug} to={`/play/${slug}`} className={styles['game-card']}>
          <div className={styles['game-card-icon']}>{game.title[0]}</div>
          <h2 className={styles['game-card-title']}>{game.title}</h2>
          <span className={styles['game-card-cta']}>Play now →</span>
        </Link>
      ))}
    </div>
  );
};
