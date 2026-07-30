import { defineConfig, devices } from '@playwright/test';

const PORT = 8080;
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? [['junit', { outputFile: 'test-results.xml' }], ['html']] : 'list',
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    // Playwright starts the mock dev server itself, so no external wrapper is needed
    // and the --mode flag reaches Vite intact
    webServer: process.env.E2E_BASE_URL
        ? undefined
        : {
              command: 'yarn vite --mode mock',
              url: BASE_URL,
              reuseExistingServer: !process.env.CI,
              stdout: 'pipe',
              stderr: 'pipe',
          },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
