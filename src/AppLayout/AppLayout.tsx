import { Link, Outlet } from 'react-router';
import './AppLayout.css';

const AppLayout: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/play">Games</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AppLayout;
