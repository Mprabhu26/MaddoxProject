import LOCATORS from '../utils/locators.js';

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async getCounterValue() {
    const counterText = await this.page.locator(LOCATORS.HOME_PAGE.COUNTER_VALUE).innerText();
    return Number(counterText.trim());
  }

  async increaseCounter() {
    await this.page.click(LOCATORS.HOME_PAGE.PLUS_BUTTON);
  }

  async decreaseCounter() {
    await this.page.click(LOCATORS.HOME_PAGE.MINUS_BUTTON);
  }

  async resetCounter() {
    await this.page.click(LOCATORS.HOME_PAGE.RESET_BUTTON);
  }

  async isHomeHeaderVisible() {
    return await this.page.locator(LOCATORS.HOME_PAGE.HOME_HEADER).isVisible();
  }
  
  async isCounterLabelVisible() {
    return await this.page.locator(LOCATORS.HOME_PAGE.COUNTER).isVisible();
  }

  async validateHomePageElements() {
    console.log("Validating home page elements...");

    if (!(await this.isHomeHeaderVisible())) {
      throw new Error('Home Header is not visible');
    }
    console.log("Home Header is visible.");

    if (!(await this.isCounterLabelVisible())) {
      throw new Error('Counter Label is not visible');
    }
    console.log("Counter Label is visible.");
  }

  async validateCounterIncrement() {
    let initialCounter = await this.getCounterValue();
    console.log(`Initial Counter: ${initialCounter}`);

    for (let i = 1; i <= 2; i++) {
      await this.increaseCounter();
      await this.page.waitForTimeout(500); // Small delay for stability
      let updatedCounter = await this.getCounterValue();
      if (updatedCounter !== initialCounter + i) {
        throw new Error(`Increment failed: Expected ${initialCounter + i}, got ${updatedCounter}`);
      }
      console.log(`Counter incremented to: ${updatedCounter}`);
    }
  }

  async validateCounterDecrement() {
    let updatedCounter = await this.getCounterValue();
    console.log(`Starting decrement from: ${updatedCounter}`);

    while (updatedCounter > 0) {
      await this.decreaseCounter();
      await this.page.waitForTimeout(500);
      updatedCounter = await this.getCounterValue();
      console.log(`Counter decremented to: ${updatedCounter}`);
    }

    console.log("Counter reached zero, checking negative values...");

    for (let i = -1; i >= -2; i--) {
      await this.decreaseCounter();
      await this.page.waitForTimeout(500);
      updatedCounter = await this.getCounterValue();
      if (updatedCounter !== i) {
        throw new Error(`Negative value mismatch: Expected ${i}, got ${updatedCounter}`);
      }
      console.log(`Counter went negative: ${updatedCounter}`);
    }
  }

  async validateCounterReset() {
    console.log("Resetting counter...");
    await this.resetCounter();
    await this.page.waitForTimeout(500);
    let counterValue = await this.getCounterValue();
    if (counterValue !== 0) {
      throw new Error(`Reset failed: Expected 0, got ${counterValue}`);
    }
    console.log("Counter reset successfully.");
  }

  async logout() {
    console.log("Logging out...");
    await this.page.click(LOCATORS.HOME_PAGE.LOGOUT_BUTTON);
    await this.page.waitForTimeout(500);
    // Verify that the user is redirected to the login page
  if (!(await this.page.locator(LOCATORS.LOGIN.DEMO_HEADER).isVisible())) {
    throw new Error("Logout failed: User is still on the home page.");
  }
  console.log("Logout successful: User redirected to login page.");
  }
}

export default HomePage;
