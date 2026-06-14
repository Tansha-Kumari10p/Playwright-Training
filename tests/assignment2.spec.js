import { test, expect } from '@playwright/test';

// importing data from .js fixtures files
import {USERNAME, PASSWORD } from '../Fixtures/constants.js'
import { BASE_URL } from '../Fixtures/urlConstants.js';

// importing data from json file
const testdata = require("../Fixtures/constants.json");

// importing data from .env
import dotenv from 'dotenv';
dotenv.config();

const envUsername = process.env.TEST_USERNAME;
const envPassword = process.env.TEST_PASSWORD;

//Login test with data driven approach using constants.js 
test('Login test', async ({ page }) => {

    //Navigate to login page
    await navigateToLoginPage(page);

    //fill in the login form 
    await fillLoginForm(page, USERNAME, PASSWORD);

    //submit login form
    await submitLoginForm(page);

    //verify successful login
    await verifySuccessfulLogin(page);
});

//Login test with .env data
test('Login test with env data', async ({ page }) => {

    //Navigate to login page
    await navigateToLoginPage(page);

    //fill in the login form 
    await fillLoginForm(page, envUsername, envPassword);

    //submit login form
    await submitLoginForm(page);

    //verify successful login
    await verifySuccessfulLogin(page);

});

async function navigateToLoginPage(page){

    //base URL fetched from constants.json file
    await page.goto(`${testdata.base_URL}/practice-test-login/`);
}

 async function fillLoginForm(page, username, password) {
    await page.getByRole('textbox', {name: 'Username'}).click();
    await page.getByRole('textbox', {name: 'Username'}).fill(username);
    await page.getByRole('textbox', {name: 'Password'}).click();
    await page.getByRole('textbox', {name: 'Password'}).fill(password);
}

async function submitLoginForm(page) {
    await page.getByRole('button', {name: 'Submit'}).click();
}

async function verifySuccessfulLogin(page){
    await expect(page.getByRole('heading', {name: 'Logged In Successfully'})).toBeVisible();
    await expect(page.getByRole('strong')).toContainText('Congratulations student. You successfully logged in!');

}

   
    
