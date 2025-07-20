
import { test, expect } from '@playwright/test';
import { createTestUser } from './helpers';

test.describe('Authentication Flow', () => {

  test('should allow a new user to sign up and then log out', async ({ page }) => {
    const newUser = createTestUser();

    // 1. Navigate to the signup page
    await page.goto('/signup');
    await expect(page).toHaveTitle(/Connect Hub/);

    // 2. Fill out the signup form
    await page.getByTestId('email').fill(newUser.email);
    await page.getByTestId('password').fill(newUser.password);
    await page.getByLabel('Confirm Password').fill(newUser.password);
    
    // Check the terms and conditions box
    await page.getByLabel(/I agree to the/).check();
    
    // 3. Submit the form
    await page.getByTestId('signup-button').click();

    // 4. Assert that the user is now on the dashboard and the terms modal appears.
    await page.waitForURL('/dashboard');
    await expect(page.getByText("Welcome to Connect Hub!")).toBeVisible();
    
    // 5. Accept the terms in the modal.
    await page.getByRole('button', { name: 'I Agree and Continue' }).click();
    await expect(page.getByText("Welcome to Connect Hub!")).not.toBeVisible();


    // 6. Assert that the user's name is in the user menu, confirming they are logged in.
    await page.getByTestId('user-menu').click();
    const userDisplayName = page.getByTestId('user-display-name');
    await expect(userDisplayName).toBeVisible();
    await expect(userDisplayName).toHaveText(newUser.email.split('@')[0]);

    // 7. Log out
    await page.getByTestId('logout-button').click();

    // 8. Assert that the user is redirected to the login page.
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');
  });

  test('should show an error for an existing email during signup', async ({ page }) => {
    const existingUser = createTestUser();
    
    // Create the user for the first time
    await page.goto('/signup');
    await page.getByTestId('email').fill(existingUser.email);
    await page.getByTestId('password').fill(existingUser.password);
    await page.getByLabel('Confirm Password').fill(existingUser.password);
    await page.getByLabel(/I agree to the/).check();
    await page.getByTestId('signup-button').click();
    await page.waitForURL(/\/dashboard/);
    
    // Log out to try again
    if (page.url().includes('/dashboard')) {
      // The modal might still be open. We can ignore it and just log out.
      await page.getByTestId('user-menu').click();
      await page.getByTestId('logout-button').click();
      await page.waitForURL('/login');
    }

    // Attempt to sign up again with the same email
    await page.goto('/signup');
    await page.getByTestId('email').fill(existingUser.email);
    await page.getByTestId('password').fill(existingUser.password);
    await page.getByLabel('Confirm Password').fill(existingUser.password);
    await page.getByLabel(/I agree to the/).check();
    await page.getByTestId('signup-button').click();
    
    // Assert that an error message is shown
    const errorMessage = page.getByTestId('error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('email address is already in use');
  });


});
