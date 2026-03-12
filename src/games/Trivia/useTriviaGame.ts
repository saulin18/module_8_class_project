import { useState } from 'react';
import type { Question } from './api';

function shuffleAnswers(q: Question): string[] {
  return [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5);
}

export function useTriviaGame(questions: Question[]) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [allAnswers, setAllAnswers] = useState<string[]>(() => shuffleAnswers(questions[0]));

  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    if (answerSubmitted) return;
    setSelectedAnswer(answer);
    setAnswerSubmitted(true);
    if (answer === question.correct_answer) {
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

  const getAnswerClass = (answer: string): string => {
    const isCorrect = answer === question.correct_answer;
    const isSelected = answer === selectedAnswer;
    if (answerSubmitted) {
      if (isCorrect) return 'trivia-answer-btn correct';
      if (isSelected) return 'trivia-answer-btn incorrect';
    } else if (isSelected) {
      return 'trivia-answer-btn selected';
    }
    return 'trivia-answer-btn';
  };

  return {
    question,
    allAnswers,
    currentQuestion,
    score,
    finalScore: Math.round((score / questions.length) * 1000),
    showResult,
    answerSubmitted,
    isLastQuestion: currentQuestion === questions.length - 1,
    handleAnswer,
    nextQuestion,
    getAnswerClass,
  };
}
