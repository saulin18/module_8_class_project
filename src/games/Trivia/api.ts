export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export async function getQuestions(): Promise<Question[]> {
  const res = await fetch('https://opentdb.com/api.php?amount=10');
  if (!res.ok) throw new Error(`Network error: ${res.status}`);

  const data = await res.json();
  if (data.response_code !== 0) {
    throw new Error(`Could not load questions (code ${data.response_code})`);
  }

  return data.results.map((q: Question) => ({
    ...q,
    question: decodeHtml(q.question),
    category: decodeHtml(q.category),
    correct_answer: decodeHtml(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(decodeHtml),
  }));
}
