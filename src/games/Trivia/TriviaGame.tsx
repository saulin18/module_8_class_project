import React, { useEffect, useRef, useState } from 'react';
import './Trivia.css';
import type { Question } from './api';
import { ScoreSubmit } from '#shared/components/index';

function smoothScrollTo(
  element: HTMLElement,
  target: number,
  duration: number,
) {
  const start = element.scrollTop;
  const change = target - start;
  if (change === 0) return;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
    element.scrollTop = start + change * eased;
    if (elapsed < duration) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function shuffleAnswers(q: Question): string[] {
  return [q.correct_answer, ...q.incorrect_answers].sort(
    () => Math.random() - 0.5,
  );
}

export const TriviaGame: React.FC<{
  questions: Question[];
  onRestart: () => void;
}> = ({ questions, onRestart }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [allAnswers, setAllAnswers] = useState<string[]>(() =>
    shuffleAnswers(questions[0]),
  );

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

  const handleAnswer = (answer: string) => {
    if (answerSubmitted) return;
    setSelectedAnswer(answer);
    setAnswerSubmitted(true);

    if (answer === questions[currentQuestion].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setAllAnswers(shuffleAnswers(questions[next]));
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="trivia-result">
        <h2>Game Over!</h2>
        <p className="trivia-score">
          {score} / {questions.length} correct
        </p>
        <ScoreSubmit
          gameSlug="trivia"
          score={Math.round((score / questions.length) * 1000)}
          onDone={onRestart}
        />
      </div>
    );
  }

  const question = questions[currentQuestion];

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
        {allAnswers.map((answer) => {
          const isCorrect = answer === question.correct_answer;
          const isSelected = answer === selectedAnswer;

          let btnClass = 'trivia-answer-btn';
          if (answerSubmitted) {
            if (isCorrect) {
              btnClass += ' correct';
            } else if (isSelected) {
              btnClass += ' incorrect';
            }
          } else if (isSelected) {
            btnClass += ' selected';
          }

          return (
            <button
              key={answer}
              onClick={() => handleAnswer(answer)}
              disabled={answerSubmitted}
              className={btnClass}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {answerSubmitted && (
        <button
          onClick={nextQuestion}
          className="trivia-next-btn"
          ref={nextBtnRef}
        >
          {currentQuestion < questions.length - 1
            ? 'Next Question'
            : 'See Results'}
        </button>
      )}
    </div>
  );
};
