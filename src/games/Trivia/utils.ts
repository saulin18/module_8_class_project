export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const fetchQuestions = async (): Promise<Question[]> => {
  const res = await fetch('https://opentdb.com/api.php?amount=10');
  const data = await res.json();
  return data.results.map((q: Question) => ({
    ...q,
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a: string) =>
      decodeURIComponent(a),
    ),
  }));
};
