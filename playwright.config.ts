import { PlaywrightTestConfig } from '@playwright/test';
// const capabilities = {
//   'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
//   'browserVersion': 'latest',
//   'LT:Options': {
//       'platform': 'Windows 10',
//       'build': 'Playwright Test from playwrigth.config.ts',
//       'name': 'Playwright Test -1',
//       'user': 'kebijebi',
//       'accessKey': 'E5qHCHGku1lbPr57J91gVWCxzia0HRvc9TyUSyI5QxZ1tDto7Z',
//       'network': true,
//       'video': true,
//       'console': true
//   }
// };

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "chrome:latest:MacOS Catalina@lambdatest",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "chrome:latest:Windows 10@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    //run it locall on your machine and change
    {
      name: 'chrome',
      use: { 
        browserName: 'chromium',
        // ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        // ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webKit',
      use: { 
        browserName: 'webkit',
        // ...devices['Desktop Safari'],
      },
    },
  ],
  testMatch: ["pomtest/addToCartUsingFixture.test.ts"],
  use: {
    // connectOptions: {
    //   wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    // },  
    baseURL: 'https://ecommerce-playground.lambdatest.io/index.php?',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    launchOptions: {
      // slowMo: 500,
    },
    
  },
  retries: 0,
  reporter: [['dot'], ['junit', { 
    outputFile: 'jsonReports/jsonReport.json' 
  }], ['html', {
    open: 'never',
  }]]
};

export default config;

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  /* Run your local dev server before starting the tests */
  // webServer: {

