import { test, expect } from '@playwright/test';
import { launchBrowser, closeBrowser } from '../helpers/browserSetup.js';
import LoginPage from '../pages/loginPage.js';
import HomePage from '../pages/homePage.js';

let browser, context, page, loginPage, homePage;

test.beforeEach(async () => {
  ({ browser, context, page } = await launchBrowser());
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
});

test.afterEach(async () => {
  await closeBrowser(browser);
});

test('Login, Validate Counter, Logout', async () => {
  await page.goto('http://localhost:3000/login');
  await page.waitForTimeout(1000); // Small delay for stability

  await loginPage.validateLoginPageElements();

  await loginPage.login('test@maddox123.ai', 'supersecure');
  await expect(page).toHaveURL('http://localhost:3000/');
  await page.waitForTimeout(2000); // Small delay for stability

  await homePage.validateHomePageElements();

  await homePage.validateCounterIncrement();
  await homePage.validateCounterDecrement();
  await homePage.validateCounterReset();

  await homePage.logout();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

