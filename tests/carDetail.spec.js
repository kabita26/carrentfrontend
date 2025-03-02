// import { test, expect } from '@playwright/test';

// test.describe('Car Detail Page', () => {

//   test.beforeEach(async ({ page }) => {
//     // Mock API response for car details before navigation
//     await page.route('http://localhost:3001/carlisting/1', async (route) => {
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify({
//           id: "1",
//           name: "Tesla Model S",
//           brand: "Tesla",
//           model: "Model S",
//           year: 2023,
//           description: "A high-performance electric sedan.",
//           available: true,
//           imageURL: "https://via.placeholder.com/150"
//         }),
//       });
//     });

//     await page.goto('http://localhost:5173/car-detail/1'); // Adjust if needed
//     await page.waitForLoadState('load'); // Ensure full page load
//     await page.waitForTimeout(2000); // Allow React to render components
//   });

//   test('should render car details correctly', async ({ page }) => {
//     // Check if car details are displayed
//     await expect(page.locator('text=Tesla Model S')).toBeVisible({ timeout: 10000 });
//     await expect(page.locator('text=Brand: Tesla')).toBeVisible({ timeout: 10000 });
//     await expect(page.locator('text=Model: Model S')).toBeVisible({ timeout: 10000 });
//     await expect(page.locator('text=Year: 2023')).toBeVisible({ timeout: 10000 });
//     await expect(page.locator('text=A high-performance electric sedan.')).toBeVisible({ timeout: 10000 });
//     await expect(page.locator('text=Available')).toBeVisible({ timeout: 10000 });
//   });

//   test('should display car image', async ({ page }) => {
//     // Check if the car image is displayed
//     const image = page.locator('img[alt="Tesla Model S"]');
//     await expect(image).toBeVisible({ timeout: 10000 });
//     await expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
//   });

//   test('should load delivery and review sections', async ({ page }) => {
//     // Check if Delivery and Review sections are loaded
//     await expect(page.locator('text=Delivery')).toBeVisible({ timeout: 10000 }); // Adjust if needed
//     await expect(page.locator('text=Review')).toBeVisible({ timeout: 10000 }); // Adjust if needed
//   });

// });
