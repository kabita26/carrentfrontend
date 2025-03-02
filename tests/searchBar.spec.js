import { test, expect } from '@playwright/test';

test.describe('Search Bar Component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/'); // Adjust if needed
    await page.waitForLoadState('load');
  });

  test('should render search bar and buttons correctly', async ({ page }) => {
    await expect(page.locator('input[placeholder="Search for cars..."]')).toBeVisible();
    await expect(page.locator('button')).toBeVisible();
    await expect(page.locator('text=Search')).toBeVisible(); // Ensure button text is "Search"
  });

  test('should show search results when a user types', async ({ page }) => {
    // Mock API response for search
    await page.route('http://localhost:3001/car/search*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          car: [
            { _id: '1', name: 'Tesla Model S', brand: 'Tesla', imageURL: 'https://via.placeholder.com/150' },
            { _id: '2', name: 'BMW 3 Series', brand: 'BMW', imageURL: 'https://via.placeholder.com/150' },
          ],
        }),
      });
    });

    // Type search term
    await page.fill('input[placeholder="Search for cars..."]', 'Tesla');
    
    // Wait for search results to show up
    await expect(page.locator('text=Tesla Model S')).toBeVisible();
    await expect(page.locator('text=BMW 3 Series')).toBeVisible();
  });

  test('should navigate to car detail page when a car is clicked', async ({ page }) => {
    // Mock API response for search
    await page.route('http://localhost:3001/car/search*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          car: [
            { _id: '1', name: 'Tesla Model S', brand: 'Tesla', imageURL: 'https://via.placeholder.com/150' },
          ],
        }),
      });
    });

    // Type search term
    await page.fill('input[placeholder="Search for cars..."]', 'Tesla');
    
    // Wait for search results to show up
    await expect(page.locator('text=Tesla Model S')).toBeVisible();

    // Click on the first car to navigate to its detail page
    await page.locator('text=Tesla Model S').click();

    // Ensure it navigates to the car detail page
    await expect(page).toHaveURL(/.*car-detail/); // Adjust the URL pattern as per your routes
  });

  test('should log out the user correctly when logout is clicked', async ({ page }) => {
    // Mock user authentication
    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({ token: 'fake-token' }));
    });

    // Navigate to home page
    await page.goto('http://localhost:5173/');

    // Click on user icon to log out
    await page.click('button:has-text("Logout")');

    // Ensure user is logged out (check if login button is visible)
    await expect(page.locator('text=Login')).toBeVisible();
  });

  test('should show total items in cart', async ({ page }) => {
    // Mock cart state
    await page.addInitScript(() => {
      localStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 2 }]));
    });

    // Navigate to home page
    await page.goto('http://localhost:5173/');

    // Ensure the cart icon shows the correct number of items
    await expect(page.locator('.cart-item-count')).toHaveText('2'); // Assuming the count has class 'cart-item-count'
  });

});
