import { Routes, Route } from 'react-router';
import AppLayout from './AppLayout';
import Play from './Play';
import { LeaderboardList, LeaderboardDetail } from './Leaderboard';
export function AppRoutes() {
  return (
    <Routes>
      <Route Component={AppLayout}>
        <Route path="/play/:slug" Component={Play} />
        <Route path="/leaderboard" Component={LeaderboardList} />
        <Route path="/leaderboard/:slug" Component={LeaderboardDetail} />
      </Route>
    </Routes>
  );
}
