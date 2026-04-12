import { defineConfig, devices } from '@playwright/test';
require('dotenv').config({ silent: true });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  timeout:300_000,
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    // video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    bypassCSP: true,
  },


  // configuring Qase reporter
  // reporter: [
  //   ['list'],
  //   [
  //     'playwright-qase-reporter',
  //     {
  //       mode: 'testops',
  //       testops: {

  //         api: {
  //           token: process.env.QASE_API_TOKEN,
  //         },
  //         project: process.env.QASE_PROJECT_ID,
  //         uploadAttachments: true,
  //       }
  //     }
  //   ]
  // ],
  /* Configure projects for major browsers */
  projects: [

    { name: 'player', testMatch: /player\.setup\.ts/, use: { baseURL: process.env.DEV_URL_GAMITOOL, } },
    { name: 'mentor', testMatch: /mentor\.setup\.ts/, use: { baseURL: process.env.DEV_URL_GAMITOOL, } },



    {
      name: 'public',
      testDir: "./tests/specs/public",
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.DEV_URL_GAMITOOL,
        trace:'off'
      },

    },
    {
      name: "player auth",
      testDir: "./tests/specs/player",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.DEV_URL_GAMITOOL,
        storageState: 'playwright/.auth/player.json',

      },
      dependencies: ['player'],
    },
    {
      name: "mentor auth",
      testDir: "./tests/specs/mentor",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.DEV_URL_GAMITOOL,
        storageState: 'playwright/.auth/mentor.json',

      },
      dependencies: ['mentor'],
    }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
