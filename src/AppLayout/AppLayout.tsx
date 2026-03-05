import { Link, Outlet } from 'react-router';

const AppLayout: React.FC = () => {
  return (
    <div>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/leaderboard" style={{ marginRight: '1rem' }}>
          Leaderboard
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AppLayout;
