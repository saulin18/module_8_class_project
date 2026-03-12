import { useState } from 'react';
import { Link } from 'react-router';
import { saveScore } from '#shared/storage';
import './ScoreSubmit.module.css';

type Props = {
  gameSlug: string;
  score: number;
  onDone: () => void;
};

export const ScoreSubmit: React.FC<Props> = ({ gameSlug, score, onDone }) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveScore(gameSlug, name.trim(), score);
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="score-submit">
        <p className="score-submit__saved">Score saved!</p>
        <p className="score-submit__points">{score} pts</p>
        <div className="score-submit__actions">
          <button
            className="score-submit__btn score-submit__btn--primary"
            onClick={onDone}
          >
            Play Again
          </button>
          <Link
            to={`/leaderboard/${gameSlug}`}
            className="score-submit__btn score-submit__btn--secondary"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="score-submit">
      <p className="score-submit__label">Your score</p>
      <p className="score-submit__points">{score} pts</p>
      <form className="score-submit__form" onSubmit={handleSubmit}>
        <input
          className="score-submit__input"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          autoFocus
        />
        <button
          className="score-submit__btn score-submit__btn--primary"
          type="submit"
          disabled={!name.trim()}
        >
          Save Score
        </button>
      </form>
      <button
        className="score-submit__btn score-submit__btn--ghost"
        onClick={onDone}
      >
        Skip
      </button>
    </div>
  );
};
