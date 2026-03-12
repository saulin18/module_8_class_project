import { Suspense, use, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styles from './Trivia.module.css';
import { TriviaGame } from './TriviaGame';
import { getQuestions, type Question } from './api';

const TriviaPlay: React.FC<{
  promise: Promise<Question[]>;
  gameKey: number;
  onRestart: () => void;
}> = ({ promise, gameKey, onRestart }) => {
  const questions = use(promise);
  return (
    <TriviaGame key={gameKey} questions={questions} onRestart={onRestart} />
  );
};

const Trivia: React.FC = () => {
  const [{ promise, gameKey }, setState] = useState(() => ({
    promise: getQuestions(),
    gameKey: 0,
  }));

  const refresh = useCallback(() => {
    setState((prev) => ({
      promise: getQuestions(),
      gameKey: prev.gameKey + 1,
    }));
  }, []);

  return (
    <Suspense
      fallback={
        <div className={styles['trivia-loading']}>Loading questions…</div>
      }
    >
      <ErrorBoundary
        onReset={refresh}
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div className={styles['trivia-error']}>
            <p>Error loading questions: {error.message}</p>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        )}
      >
        <TriviaPlay promise={promise} gameKey={gameKey} onRestart={refresh} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Trivia;
