import {test as setup, expect} from '@playwright/test';
import LoginPage from '../pages/login.js';

const testdata = require("../Fixtures/constants.json");

const authFile = 'playwright/.auth/authentication.json';  

setup('Log in to the application', async ({page}) => {

    const loginPage = new LoginPage(page);
    await page.goto(`https://practicetestautomation.com/practice-test-login/`);
    await loginPage.login(testdata.username, testdata.password);
    await expect(page).toHaveURL(`https://practicetestautomation.com/logged-in-successfully/`);

    // Store the login state in the storage file for use in other test
    await page.context().storageState({ path: authFile });
});





