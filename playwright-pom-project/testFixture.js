import { test as base, expect } from '@playwright/test';
import { launchBrowser, closeBrowser } from './helpers/browserSetup.js';
import LoginPage from './pages/loginPage.js';
import HomePage from './pages/homePage.js';

let browser, context; // Store instances globally

export const test = base.extend({
  browserContext: async ({}, use) => {
    if (!browser) {
      browser = await launchBrowser();  // ✅ Ensure browser is launched
      context = await browser.newContext(); // ✅ Create new context
    }
    await use(context); // ✅ Provide browser context to tests
  },

  page: async ({ browserContext }, use) => {
    const page = await browserContext.newPage();
    await page.goto('http://localhost:3000'); // ✅ Ensure page starts on home
    await use(page);
    await page.close();
  },

  loginPage: async ({ page }, use) => {
    await page.goto('http://localhost:3000/login'); // ✅ Ensure loginPage starts correctly
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    await page.goto('http://localhost:3000/home'); // ✅ Ensure homePage starts correctly
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

// ✅ Close browser after all tests
test.afterAll(async () => {
  if (browser) {
    await closeBrowser(browser);
    browser = null;
    context = null;
  }
});

export { expect };
