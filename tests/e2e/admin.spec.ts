
import { test, expect } from '@playwright/test';
import { createTestUser } from './helpers';

test.describe('Admin Access Control', () => {

  // This test runs as a standard, non-admin user.
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
      
      await page.waitForURL('/dashboard');
      await page.getByRole('button', { name: 'I Agree and Continue' }).click();

      const storageStatePath = `tests/e2e/.auth/non-admin-${user.email.split('@')[0]}.json`;
      await page.context().storageState({ path: storageStatePath });
      await page.close();

      await use(storageStatePath);
    },
  });

  test('should prevent a non-admin user from accessing the admin page', async ({ page }) => {
    // 1. Attempt to navigate directly to the admin page.
    await page.goto('/admin');
    
    // 2. Expect a toast message indicating access is denied.
    await expect(page.getByText('Access Denied')).toBeVisible();

    // 3. Assert that the user is redirected back to the dashboard.
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Admin Dashboard')).not.toBeVisible();
  });

});

// This is a conceptual test for the admin user.
// It would require setting up a user with admin claims in Firebase beforehand.
test.describe.skip('Admin Dashboard View', () => {
    
    // Before running this test, you would need a way to programmatically
    // create a user and assign them an `admin: true` custom claim using the Firebase Admin SDK.
    test.use({
        storageState: 'tests/e2e/.auth/admin-user.json', // A pre-generated auth state for an admin
    });

    test('should allow an admin user to view the user list', async ({ page }) => {
        // 1. Navigate to the admin page.
        await page.goto('/admin');
        
        // 2. Assert that the admin dashboard title is visible.
        await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
        
        // 3. Assert that the "Users" table is visible.
        await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

        // 4. Assert that at least one user row is present in the table.
        // This assumes the admin user itself is in the 'users' collection.
        await expect(page.getByRole('cell', { name: /@/ })).toHaveCount(1);
    });
});
