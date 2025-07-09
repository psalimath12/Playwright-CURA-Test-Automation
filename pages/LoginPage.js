
const { expect } = require('@playwright/test');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators for elements on the login page
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
    this.loginErrorMessage = page.locator('.text-danger'); // Locator for error message
  }

  /**
   * Navigates to the login page.
   */
  async goto() {
    await this.page.goto('/profile.php#login');
  }

  /**
   * Performs a login action with the given credentials.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Asserts that the login error message is visible and contains the expected text.
   * @param {string} message
   */
  async expectLoginErrorMessage(message) {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toHaveText(message);
  }

  /**
   * Asserts that the username input is visible.
   */
  async expectUsernameInputVisible() {
    await expect(this.usernameInput).toBeVisible();
  }
}

module.exports = LoginPage;