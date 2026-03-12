import { Outlet } from 'react-router';

import styles from './GamesComponent.module.css';

export const GamesComponent: React.FC = () => {
  return (
    <div className={styles['games-wrapper']}>
      <Outlet />
    </div>
  );
};
