import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:8080';

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
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
