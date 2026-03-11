# GameHub

A collection of browser-based games built with React 19, TypeScript, and Vite. Features a shared leaderboard, client-side routing, and a clean component architecture designed as a class project for Harbour Space University.

## Games

| Game       | Description                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Wordle** | Guess the hidden 5-letter word. Each keypress is color-coded as correct, misplaced, or wrong.                                             |
| **Trivia** | 10 multiple-choice questions fetched from the [Open Trivia DB](https://opentdb.com/) API with shuffled answers and difficulty indicators. |

## Tech Stack

- **React 19** — `use()` hook for Suspense-based data fetching
- **TypeScript** — strict mode throughout
- **React Router v7** — client-side routing with lazy-loaded game components
- **Vite 7** — dev server and production build
- **Vitest + Testing Library** — unit and component tests

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Project Structure

```
src/
├── AppLayout/        # Persistent nav shell
├── HomePage/         # Landing page with game grid
├── Play/             # Dynamic game loader by slug
├── Leaderboard/      # Leaderboard list and detail views
├── shared/           # Shared hooks and utilities
└── games/
    ├── Wordle/       # Wordle game
    └── Trivia/       # Trivia game (API + components)
```

## Scripts

| Command      | Description                         |
| ------------ | ----------------------------------- |
| `pnpm dev`   | Start local dev server              |
| `pnpm build` | Type-check and build for production |
| `pnpm test`  | Run tests in watch mode             |
| `pnpm lint`  | Run ESLint                          |
