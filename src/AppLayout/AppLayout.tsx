import { Link, Outlet } from 'react-router';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/play">Games</Link>
      </nav>
      <Outlet />
    </div>
  );
};
