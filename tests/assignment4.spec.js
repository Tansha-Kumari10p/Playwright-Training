import { test, expect } from '@playwright/test';

test.describe('Login Test', () => {

    // Use the storage state from the authentication file to maintain logged-in state
    test.use({ storageState: 'playwright/.auth/authentication.json' }); 
    test('Verify logged-in state', async ({page}) => {

        // Navigate to the logged-in page
        await page.goto('https://practicetestautomation.com/logged-in-successfully/');

        // Verify logged-in URL
        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');

        // Verify page heading
        await expect(page.locator('h1')).toContainText('Logged In Successfully');

        // Verify log out button is visible
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();

        // Click Log out button
        await page.getByRole('link', { name: 'Log out' }).click();
    });
    
});