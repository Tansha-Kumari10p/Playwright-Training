import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.js';
import {USERNAME, PASSWORD, WRONG_USERNAME, WRONG_PASSWORD } from '../Fixtures/constants.js'

test('Positive Login test', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    const loginPage = new LoginPage(page);

    await loginPage.enterUsername('student');
    await loginPage.enterPassword('Password123');
    await loginPage.clickSubmit();
});

test ('Negative Login test with invalid username', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    const loginPage = new LoginPage(page);

    await loginPage.enterUsername(WRONG_USERNAME);
    await loginPage.enterPassword(PASSWORD);
    await loginPage.clickSubmit();

    //Verify error message 
    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.usernameError).toHaveText('Your username is invalid!');
});

test ('Negative Login test with invalid password', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    const loginPage = new LoginPage(page);
    await loginPage.login( USERNAME, WRONG_PASSWORD);

    //Verify error message 
    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.passwordError).not.toHaveText('Your username is invalid!');
    await expect(loginPage.passwordError).toHaveText('Your password is invalid!');

});