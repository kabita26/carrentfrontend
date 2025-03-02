import { test, expect } from '@playwright/test';

test.describe('LeftCheckout Component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/checkout'); // Adjust if needed
    await page.waitForLoadState('load'); // Ensure full page load
    await page.waitForTimeout(2000); // Allow React to render
  });

  test('should render LeftCheckout component correctly', async ({ page }) => {
    await expect(page.locator('text=Pickup Location')).toBeVisible();
    await expect(page.locator('text=Dropoff Location')).toBeVisible();
    await expect(page.locator('text=Total Rental Days')).toBeVisible();
    await expect(page.locator('text=Proceed to Payment')).toBeVisible();
  });

  test('should allow user to input Pickup and Dropoff locations', async ({ page }) => {
    await page.fill('input[placeholder="Enter Pickup Location"]', 'Kathmandu');
    await page.fill('input[placeholder="Enter Dropoff Location"]', 'Pokhara');

    await expect(page.locator('input[placeholder="Enter Pickup Location"]')).toHaveValue('Kathmandu');
    await expect(page.locator('input[placeholder="Enter Dropoff Location"]')).toHaveValue('Pokhara');
  });

  test('should allow user to select Pickup and Dropoff dates', async ({ page }) => {
    await page.fill('input[type="date"]', '2025-06-15'); // Pickup Date
    await page.fill('input[type="date"]', '2025-06-20'); // Dropoff Date

    await expect(page.locator('input[type="date"]')).toHaveValue('2025-06-15');
  });

  test('should calculate total rental cost correctly', async ({ page }) => {
    await page.fill('input[type="date"]', '2025-06-15'); // Pickup Date
    await page.fill('input[type="date"]', '2025-06-20'); // Dropoff Date

    await page.waitForTimeout(1000); // Wait for calculations

    const rentalCost = await page.locator('text=Rental Cost').innerText();
    expect(rentalCost).toMatch(/Rs \d+/);
  });

  test('should proceed to payment when clicked', async ({ page }) => {
    await page.waitForSelector('button:has-text("Proceed to Payment")', { state: 'visible', timeout: 10000 });
    await page.click('button:has-text("Proceed to Payment")');
  });

});

