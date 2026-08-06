import { defineConfig, devices } from '@playwright/test'

const port = 3100
const browserProjects = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
]

if (process.env.CI) browserProjects.splice(2, 0, { name: 'webkit', use: { ...devices['Desktop Safari'] } })

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  outputDir: 'test-results',
  use: {
    baseURL: `http://localhost:${port}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
  },
  projects: browserProjects,
  webServer: {
    command: `node scripts/serve-static.mjs --port ${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    url: `http://localhost:${port}`,
  },
})
