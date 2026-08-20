import { defineConfig, devices } from '@playwright/test';

/**
 * Runs against the STATIC EXPORT in out/, not `next dev`.
 *
 * This matters: several specs assert a real HTTP 404 for unknown routes, and
 * only the exported build produces one. Testing against the dev server would
 * make those assertions meaningless.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'list' : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:8100',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx serve out -l 8100 --no-clipboard',
    url: 'http://127.0.0.1:8100',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
