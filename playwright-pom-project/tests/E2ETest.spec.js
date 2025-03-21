import { test, expect } from '@playwright/test';
import { launchBrowser, closeBrowser } from '../helpers/browserSetup.js';
import LoginPage from '../pages/loginPage.js';
import HomePage from '../pages/homePage.js';
import testData from '../utils/testData.json' assert { type: "json" };


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

  await loginPage.validateLoginPageElements();

  await loginPage.login(testData.invalidPassword.email, testData.invalidPassword.password);
  await page.waitForTimeout(1000);
  await loginPage.isErrorMessageVisible();

  await loginPage.login(testData.emailWithoutattherate.email, testData.validUser.password);
  await page.waitForTimeout(1000);
  await loginPage.EmailWithoutampersand();

  await loginPage.login(testData.emptyEmail.email, testData.emptyEmail.password);
  await page.waitForTimeout(1000);
  await loginPage.emptyEmail();

  await loginPage.login(testData.invalidEmail.email, testData.invalidEmail.password);
  await page.waitForTimeout(1000);
  await loginPage.isErrorMessageVisible();
  
  await loginPage.login(testData.emptyPassword.email, testData.emptyPassword.password);
  await page.waitForTimeout(1000);
  await loginPage.emptyPassword();
  
  await loginPage.login(testData.validUser.email, testData.validUser.password);
  await page.waitForTimeout(2000); // Small delay for stability

  await homePage.validateHomePageElements();

  await homePage.validateCounterIncrement();
  await homePage.validateCounterDecrement();
  await homePage.validateCounterReset();

  await homePage.logout();
  await page.waitForTimeout(2000);
  await loginPage.validateLoginPageElements();
  
});

