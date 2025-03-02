import { test, expect } from '@playwright/test';

test.describe('User Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login'); // Adjust if needed
    await page.waitForLoadState('load'); // Wait for the page to fully load
  });

  test('should render login form correctly', async ({ page }) => {
    await expect(page.locator('h2:has-text("Login to Car Rental")')).toBeVisible(); // Check for page title
    await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible(); // Check email input
    await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible(); // Check password input
    await expect(page.locator('button:has-text("Login")')).toBeVisible(); // Check login button
  });

  test('should allow the user to input email and password', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', 'user@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'password123');

    await expect(page.locator('input[placeholder="Enter your email"]')).toHaveValue('user@example.com');
    await expect(page.locator('input[placeholder="Enter your password"]')).toHaveValue('password123');
  });

  test('should show error message if login fails', async ({ page }) => {
    // Mock API failure for login
    await page.route('http://localhost:3001/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid email or password' }),
      });
    });

    await page.fill('input[placeholder="Enter your email"]', 'user@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
    await page.click('button:has-text("Login")');

    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should navigate to the admin page when admin logs in', async ({ page }) => {
    // Mock API response for successful admin login
    await page.route('http://localhost:3001/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'valid-token' }),
      });
    });

    await page.fill('input[placeholder="Enter your email"]', 'admin@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', 'AdminPassword');
    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL('http://localhost:5173/admin'); // Admin page URL
  });

  test('should navigate to the home page when a regular user logs in', async ({ page }) => {
    // Mock API response for successful user login
    await page.route('http://localhost:3001/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'valid-token' }),
      });
    });

    await page.fill('input[placeholder="Enter your email"]', 'user@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'password123');
    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL('http://localhost:5173/'); // Regular user home page URL
  });

});

