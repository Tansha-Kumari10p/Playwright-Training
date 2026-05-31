import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test('Log in with valid credentials', async ({page}) => {

      //Navigate to the website
      await page.goto('https://practicetestautomation.com/practice-test-login/');

      //Enter the username and password
      await expect(page.getByRole('textbox', {name: 'Username'})).toBeVisible();
      await page.getByRole('textbox', {name: 'Username'}).fill('student');

      await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible();
      await page.getByRole('textbox', {name: 'Password'}).fill('Password123');

      //Click submit button
      await expect(page.getByRole('textbox', {name: 'Submit'})).toBeEnabled;
      await page.getByRole('button', {name: 'Submit'}).click();

      //Verify page URL 
      await expect(page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");

      //Verify page heading
      await expect(page.locator("h1")).toContainText("Logged In Successfully");

      //Verify log out button is visible 
      await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();

      //Click Log out button
      await page.getByRole('link', { name: 'Log out' }).click();

    });

    test('Log in with invalid username', async ({page}) => {

      //Navigate to the website
      await page.goto('https://practicetestautomation.com/practice-test-login/');

      //Enter the username and password
      await page.getByRole('textbox', {name: 'Username'}).fill('incorrectUser');
      await page.getByRole('textbox', {name: 'Password'}).fill('Password123');

      //Click submit button
      await page.getByRole('button', {name: 'Submit'}).click();

      //Verify error message 
      await expect(page.locator(".show")).toBeVisible
      await expect(page.locator(".show")).toHaveText('Your username is invalid!')
    });

    test('Log in with invalid password', async ({page}) => {

      //Navigate to the website
      await page.goto('https://practicetestautomation.com/practice-test-login/');

      //Enter the username and password
      await page.getByRole('textbox', {name: 'Username'}).fill('student');
      await page.getByRole('textbox', {name: 'Password'}).fill('incorrectPassword');

      //Click submit button
      await page.getByRole('button', {name: 'Submit'}).click();

      //Verify error message 
      await expect(page.locator("#error")).toBeVisible
      await expect(page.locator("#error")).not.toHaveText('Your username is invalid!')
      await expect(page.locator("#error")).toHaveText('Your password is invalid!')
    });
});