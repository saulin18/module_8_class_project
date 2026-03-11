import { Routes, Route } from 'react-router';
import AppLayout from './AppLayout';
import Play from './Play';
import HomePage from './HomePage/HomePage';
import { LeaderboardList, LeaderboardDetail } from './Leaderboard';
import { GamesComponent } from './games';

export function AppRoutes() {
  return (
    <Routes>
      <Route Component={AppLayout} path="/">
        <Route index Component={HomePage} />
        <Route path="/play" Component={GamesComponent}>
          <Route path=":slug" Component={Play} />
        </Route>
        <Route path="/leaderboard" Component={LeaderboardList} />
        <Route path="/leaderboard/:slug" Component={LeaderboardDetail} />
      </Route>
    </Routes>
  );
}
