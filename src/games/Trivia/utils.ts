export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export function smoothScrollTo(
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
