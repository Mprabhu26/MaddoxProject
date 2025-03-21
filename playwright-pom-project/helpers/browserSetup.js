import { chromium } from '@playwright/test';

export async function launchBrowser() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.waitForTimeout(2000);  // ✅ Wait for 2 seconds after launching
  
  return { browser, context, page };
}

export async function closeBrowser(browser) {
  if (browser) {
    await browser.close();
  }
}
