import { Routes, Route } from 'react-router';
import { AppLayout } from './AppLayout';
import Play from './Play';
import { HomePage } from './HomePage';
import { LeaderboardList, LeaderboardDetail } from './Leaderboard';
import { GamesComponent, GamesGrid } from './games';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={AppLayout} path="/">
        <Route index Component={HomePage} />
        <Route path="/play" Component={GamesComponent}>
          <Route index Component={GamesGrid} />
          <Route path=":slug" Component={Play} />
        </Route>
        <Route path="/leaderboard" Component={LeaderboardList} />
        <Route path="/leaderboard/:slug" Component={LeaderboardDetail} />
      </Route>
    </Routes>
  );
};
