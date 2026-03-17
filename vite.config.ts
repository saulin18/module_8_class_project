/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname, './src/test/setup.ts'),
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
