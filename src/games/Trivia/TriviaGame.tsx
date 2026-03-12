import React, { useEffect, useRef } from 'react';
import styles from './Trivia.module.css';
import type { Question } from './api';
import { ScoreSubmit } from '#shared/components/index';
import { useTriviaGame } from './useTriviaGame';
import { smoothScrollTo } from './utils';

export const TriviaGame: React.FC<{
  questions: Question[];
  onRestart: () => void;
}> = ({ questions, onRestart }) => {
  const {
    question,
    allAnswers,
    currentQuestion,
    score,
    finalScore,
    showResult,
    answerSubmitted,
    isLastQuestion,
    handleAnswer,
    nextQuestion,
    getAnswerState,
  } = useTriviaGame(questions);

  const containerRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!answerSubmitted || !containerRef.current || !nextBtnRef.current)
      return;
    const container = containerRef.current;
    const btn = nextBtnRef.current;
    const target = btn.offsetTop + btn.offsetHeight - container.clientHeight;
    smoothScrollTo(container, Math.max(0, target), 600);
  }, [answerSubmitted]);

  if (showResult) {
    return (
      <div className={styles['trivia-result']}>
        <h2>Game Over!</h2>
        <p className={styles['trivia-score']}>
          {score} / {questions.length} correct
        </p>
        <ScoreSubmit gameSlug="trivia" score={finalScore} onDone={onRestart} />
      </div>
    );
  }

  return (
    <div className={styles['trivia-container']} ref={containerRef}>
      <div className={styles['trivia-progress']}>
        Question {currentQuestion + 1} / {questions.length}
      </div>

      <div className={styles['trivia-question-card']}>
        <span className={styles['trivia-difficulty']}>
          {question.difficulty}
        </span>
        <p className={styles['trivia-question']}>{question.question}</p>
        <p className={styles['trivia-category']}>{question.category}</p>
      </div>

      <div className={styles['trivia-answers']}>
        {allAnswers.map((answer) => {
          const state = getAnswerState(answer);
          const className = [
            styles['trivia-answer-btn'],
            state ? styles[state] : '',
          ]
            .join(' ')
            .trim();
          return (
            <button
              key={answer}
              onClick={() => handleAnswer(answer)}
              disabled={answerSubmitted}
              className={className}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {answerSubmitted && (
        <button
          onClick={nextQuestion}
          className={styles['trivia-next-btn']}
          ref={nextBtnRef}
        >
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  );
};
