
import { test, expect } from '@playwright/test';
import { createTestUser } from './helpers';

test.describe('Core Feature Flows', () => {

  // Create a new user for each test in this file to ensure isolation.
  // This user will be automatically logged in before each test.
  test.use({
    storageState: async ({ browser }, use) => {
      const page = await browser.newPage();
      const user = createTestUser();
      
      await page.goto('/signup');
      await page.getByTestId('email').fill(user.email);
      await page.getByTestId('password').fill(user.password);
      await page.getByLabel('Confirm Password').fill(user.password);
      await page.getByLabel(/I agree to the/).check();
      await page.getByTestId('signup-button').click();
      
      // After signup, user might be on /legal/accept. Handle it.
      await page.waitForURL(/\/dashboard|\/legal\/accept/);

      if (page.url().includes('/legal/accept')) {
        await page.getByRole('button', { name: 'I Agree and Continue' }).click();
      }

      await page.waitForURL('/dashboard');

      // Save the authentication state to a file.
      const storageStatePath = `tests/e2e/.auth/${user.email.split('@')[0]}.json`;
      await page.context().storageState({ path: storageStatePath });
      await page.close();

      // Use the saved authentication state for the test.
      await use(storageStatePath);
    },
  });

  test('should allow a user to create a new post on the social feed', async ({ page }) => {
    await page.goto('/social-feed');

    const postContent = `This is a test testimony created at ${new Date().toISOString()}`;
    
    // 1. Fill in the new post textarea.
    await page.getByTestId('new-post-textarea').fill(postContent);

    // 2. Click the submit button.
    await page.getByTestId('submit-post-button').click();

    // 3. Assert that the new post appears in the feed.
    // We check that the text content we entered is visible on the page.
    await expect(page.getByText(postContent)).toBeVisible({ timeout: 10000 });
  });

  test('should allow a user to submit a new request on the community wall', async ({ page }) => {
    await page.goto('/community-wall');

    const requestContent = `This is a test request created at ${new Date().toISOString()}`;

    // 1. Fill in the new request textarea.
    await page.getByTestId('new-prayer-request-textarea').fill(requestContent);

    // 2. Click the submit button.
    await page.getByTestId('submit-prayer-request-button').click();
    
    // 3. Assert that the new request appears on the wall.
    await expect(page.getByText(requestContent)).toBeVisible({ timeout: 10000 });
  });

  test('should allow a user to update their profile', async ({ page }) => {
    await page.goto('/settings');

    const newName = `Test User ${Date.now()}`;
    const newBio = `This is an updated bio from a Playwright test.`;

    // 1. Fill in the display name and bio fields.
    await page.getByTestId('display-name').fill(newName);
    await page.getByTestId('bio').fill(newBio);

    // 2. Click the update profile button.
    await page.getByTestId('update-profile-button').click();

    // 3. Assert that the success message appears.
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('success-message')).toContainText('Profile updated successfully!');
    
    // 4. Assert that the input fields still contain the new values after save.
    await expect(page.getByTestId('display-name')).toHaveValue(newName);
    await expect(page.getByTestId('bio')).toHaveValue(newBio);

    // 5. (Bonus) Verify the name is updated in the user navigation menu.
    await page.getByTestId('user-menu').click();
    await expect(page.getByTestId('user-display-name')).toHaveText(newName);
  });
});
