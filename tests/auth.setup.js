import {test as setup, expect} from '@playwright/test';
import LoginPage from '../pages/login.js';

const testdata = require("../Fixtures/constants.json");

const authFile = 'playwright/.auth/authentication.json';  

setup('Log in to the application', async ({page}) => {

    const loginPage = new LoginPage(page);
    await page.goto(`${testdata.base_URL}/practice-test-login/`);
    await loginPage.login(testdata.username, testdata.password);
    await expect(page).toHaveURL(`${testdata.base_URL}/logged-in-successfully/`);

    // Store the login state in the storage file for use in other tests
    await page.context().storageState({ path: authFile });
});





