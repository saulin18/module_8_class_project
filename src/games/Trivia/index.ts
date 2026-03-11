import { lazy } from 'react';
import type { Game } from '../types';

const game: Game = {
  title: 'Trivia',
  Play: lazy(() => import('./Trivia')),
};

export default game;
