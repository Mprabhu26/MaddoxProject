import LOCATORS from '../utils/locators.js';
import { expect } from '@playwright/test';


class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.fill(LOCATORS.LOGIN.USERNAME_INPUT, username);
    await this.page.fill(LOCATORS.LOGIN.PASSWORD_INPUT, password);
    await this.page.click(LOCATORS.LOGIN.LOGIN_BUTTON);
  }

  async getErrorMessage() {
    const errorMessageLocator = this.page.locator(LOCATORS.LOGIN.ERROR_MESSAGE);
    await errorMessageLocator.waitFor(); // wait till it becomes visble to get text
    console.log(errorMessageLocator.innerText());
    return errorMessageLocator.innerText();
    
  }

  async isErrorMessageVisible() {
    return await this.page.locator(LOCATORS.LOGIN.ERROR_MESSAGE).isVisible();
  }

  async EmailWithoutampersand() {
    const emailInput = this.page.locator(LOCATORS.LOGIN.USERNAME_INPUT); 
    const validationMessage = await emailInput.evaluate(el => el.validationMessage);
    console.log(`Validation Message: ${validationMessage}`);
    expect(validationMessage).toContain("Please include an '@' in the email address.");
    return validationMessage;
  }

  async emptyEmail() {
    const emailInput = this.page.locator(LOCATORS.LOGIN.USERNAME_INPUT); 
    const validationMessage = await emailInput.evaluate(el => el.validationMessage);
    console.log(`Validation Message: ${validationMessage}`);
    expect(validationMessage).toContain("Please fill out this field.");
    return validationMessage;
  }

  async emptyPassword() {
    const passInput = this.page.locator(LOCATORS.LOGIN.PASSWORD_INPUT); 
    const validationMessage = await passInput.evaluate(el => el.validationMessage);
    console.log(`Validation Message: ${validationMessage}`);
    expect(validationMessage).toContain("Please fill out this field.");
    return validationMessage;
  }

  async isDemoHeaderVisible() {
    return await this.page.locator(LOCATORS.LOGIN.DEMO_HEADER).isVisible();
  }

  async isEmailLabelVisible() {
    return await this.page.locator(LOCATORS.LOGIN.EMAIL_LABEL).isVisible();
  }

  async isPasswordLabelVisible() {
    return await this.page.locator(LOCATORS.LOGIN.PASSWORD_LABEL).isVisible();
  }

  async validateLoginPageElements() {
    if (!(await this.isDemoHeaderVisible())) {
      throw new Error('Demo Header is not visible');
    }
    if (!(await this.isEmailLabelVisible())) {
      throw new Error('Email Label is not visible');
    }
    if (!(await this.isPasswordLabelVisible())) {
      throw new Error('Password Label is not visible');
    }
  }
}

export default LoginPage;
