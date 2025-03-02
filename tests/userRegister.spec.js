import { test, expect } from '@playwright/test';

test.describe('User Registration Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register'); // Update URL if needed
  });

  test('should render registration form correctly', async ({ page }) => {
    await expect(page.locator('text=🚗 Create Your Account')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter your username"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Confirm your password"]')).toBeVisible();
    await expect(page.locator('text=I agree to the terms & conditions')).toBeVisible();
    await expect(page.locator('text=Register')).toBeVisible();
  });

});
