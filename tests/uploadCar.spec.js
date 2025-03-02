import { test, expect } from '@playwright/test';

test.describe('Upload Car Form', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/upload-car'); // Adjust URL if needed
        await page.waitForLoadState('domcontentloaded'); // Ensure the page fully loads
      });
      
  test('should render the car upload form correctly', async ({ page }) => {
    await expect(page.locator('text=🚗 Upload a New Car')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter image URL (comma separated)"]')).toBeVisible();
    await expect(page.locator('button:text("🚀 Submit Car")')).toBeVisible();
  });

  test('should allow user to fill in the form', async ({ page }) => {
    await page.fill('input[placeholder="Enter image URL (comma separated)"]', 'https://via.placeholder.com/150');
    await page.fill('input:text("Name")', 'Tesla Model S');
    await page.selectOption('select:text("Brand")', 'Tesla');
    await page.selectOption('select:text("Fuel Type")', 'Electric');
    await page.fill('input:text("Model")', 'Model S');
    await page.fill('input:text("Year")', '2023');
    await page.fill('input:text("Regular Price")', '80000');

    // Validate input values
    await expect(page.locator('input[placeholder="Enter image URL (comma separated)"]')).toHaveValue('https://via.placeholder.com/150');
    await expect(page.locator('input:text("Name")')).toHaveValue('Tesla Model S');
    await expect(page.locator('input:text("Model")')).toHaveValue('Model S');
    await expect(page.locator('input:text("Year")')).toHaveValue('2023');
  });

  test('should successfully upload a car', async ({ page }) => {
    // Mock API response for successful upload
    await page.route('http://localhost:3001/upload-car', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.fill('input:text("Name")', 'Tesla Model S');
    await page.selectOption('select:text("Brand")', 'Tesla');
    await page.fill('input:text("Model")', 'Model S');
    await page.fill('input:text("Year")', '2023');
    await page.fill('input:text("Regular Price")', '80000');

    await page.click('button:text("🚀 Submit Car")');

    await expect(page.locator('text=Car Uploaded Successfully')).toBeVisible();
  });

  test('should show error if upload fails', async ({ page }) => {
    // Mock API failure response
    await page.route('http://localhost:3001/upload-car', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to upload car' }),
      });
    });

    await page.fill('input:text("Name")', 'Tesla Model S');
    await page.selectOption('select:text("Brand")', 'Tesla');
    await page.fill('input:text("Model")', 'Model S');
    await page.fill('input:text("Year")', '2023');
    await page.fill('input:text("Regular Price")', '80000');

    await page.click('button:text("🚀 Submit Car")');

    await expect(page.locator('text=Failed to upload car')).toBeVisible();
  });

});
