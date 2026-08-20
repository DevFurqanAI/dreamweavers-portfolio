import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // Mirrors the "@/*" path in tsconfig.json. Without it, any test importing a
  // module that itself uses the alias — lib/seo.ts does — fails to resolve.
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    environment: 'node',
    // Unit tests cover what is actually falsifiable without a browser:
    // contrast maths, token/stylesheet invariants, and content shape.
    // Everything that needs rendering lives in tests/e2e (Playwright).
    include: ['tests/unit/**/*.test.ts'],
  },
});
