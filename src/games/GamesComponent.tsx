import { Outlet } from 'react-router';

import './GamesComponent.css';

export const GamesComponent: React.FC = () => {
  return (
    <div className="games-wrapper">
      <Outlet />
    </div>
  );
};
