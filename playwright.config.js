// playwright.config.js
// This file contains the Playwright configuration.
// It defines test directories, reporters, and browser configurations.

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Directory where your test files are located.
  testDir: './tests',

  // Maximum time one test can run for.
  timeout: 30 * 1000,

  // Expect timeout for assertions.
  expect: {
    timeout: 5000
  },

  // Run tests in files in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    ['html'],
    ['./utils/my_reporter.js']
  ],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'https://katalon-demo-cura.herokuapp.com',

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',

    // Headless mode for faster execution. Set to false to see the browser UI.
    headless: true, // Change to false if you want to see the browser UI during execution.

    launchOptions: {
      args: ['--no-sandbox'], // Add any necessary launch arguments here
    },
  },

  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...require('@playwright/test').devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...require('@playwright/test').devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...require('@playwright/test').devices['Desktop Safari'] },
    },
  ]
});
