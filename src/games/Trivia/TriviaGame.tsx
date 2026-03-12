import React, { useEffect, useRef } from 'react';
import './Trivia.css';
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
    getAnswerClass,
  } = useTriviaGame(questions);

  const containerRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!answerSubmitted || !containerRef.current || !nextBtnRef.current) return;
    const container = containerRef.current;
    const btn = nextBtnRef.current;
    const target = btn.offsetTop + btn.offsetHeight - container.clientHeight;
    smoothScrollTo(container, Math.max(0, target), 600);
  }, [answerSubmitted]);

  if (showResult) {
    return (
      <div className="trivia-result">
        <h2>Game Over!</h2>
        <p className="trivia-score">
          {score} / {questions.length} correct
        </p>
        <ScoreSubmit gameSlug="trivia" score={finalScore} onDone={onRestart} />
      </div>
    );
  }

  return (
    <div className="trivia-container" ref={containerRef}>
      <div className="trivia-progress">
        Question {currentQuestion + 1} / {questions.length}
      </div>

      <div className="trivia-question-card">
        <span className="trivia-difficulty">{question.difficulty}</span>
        <p className="trivia-question">{question.question}</p>
        <p className="trivia-category">{question.category}</p>
      </div>

      <div className="trivia-answers">
        {allAnswers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            disabled={answerSubmitted}
            className={getAnswerClass(answer)}
          >
            {answer}
          </button>
        ))}
      </div>

      {answerSubmitted && (
        <button onClick={nextQuestion} className="trivia-next-btn" ref={nextBtnRef}>
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  );
};
