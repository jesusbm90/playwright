import { test, Locator } from '@playwright/test';
import { SaucedemoPage } from '../pages/SaucedemoPage';

let productSortList: Locator; // <-- TODO for whoever reason, it's not performing the action

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Define locators
  const usernameInput: Locator = page.locator('input[placeholder="Username"]');
  const passwordInput: Locator = page.locator('input[placeholder="Password"]');
  const loginButton: Locator = page.locator('input[data-test="login-button"]');
  productSortList = page.locator('select[data-test="product-sort-container"]'); // <-- TODO explained above

  // Perform login
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
});

test('should allow me to sort by descending Name', async ({ page }) => {
  const saucedemoPage = new SaucedemoPage(page);

  // Verify the active product is Name (A to Z) and the first item displayed has the text 'Sauce Labs Backpack'
  saucedemoPage.expectActiveProductOptionToHaveText('Name (A to Z)');
  saucedemoPage.expectFirstItemListToHaveNameText('Sauce Labs Backpack');

  // Sort by option 'Name (Z to A)'
  // saucedemoPage.sortByOption('Name (Z to A)'); // <-- TODO for whoever reason, it's not performing the action, while next it's
  await productSortList.selectOption({ label: 'Name (Z to A)' });

  // Verify the active product is 'Name (Z to A)' and the first item displayed has the text 'Test.allTheThings() T-Shirt (Red)'
  saucedemoPage.expectActiveProductOptionToHaveText('Name (Z to A)');
  saucedemoPage.expectFirstItemListToHaveNameText(
    'Test.allTheThings() T-Shirt (Red)'
  );
});

test('should allow me to sort by descending Price', async ({ page }) => {
  const saucedemoPage = new SaucedemoPage(page);

  // Sort by option 'Price (low to high)'
  await productSortList.selectOption({ label: 'Price (low to high)' });
  saucedemoPage.expectActiveProductOptionToHaveText('Price (low to high)');

  // Verify the active product is 'Price (low to high)' and the first item displayed has the text 'Sauce Labs Onesie' and price of '$7.99'
  saucedemoPage.expectFirstItemListToHaveNameText('Sauce Labs Onesie');
  saucedemoPage.expectFirstItemListToHavePriceText('$7.99');
});

test('should allow me to sort by ascending Price', async ({ page }) => {
  const saucedemoPage = new SaucedemoPage(page);

  // Sort by option 'Price (high to low)'
  await productSortList.selectOption({ label: 'Price (high to low)' });
  saucedemoPage.expectActiveProductOptionToHaveText('Price (high to low)');

  // Verify the active product is 'Price (high to low)' and the first item displayed has the text 'Sauce Labs Fleece Jacket' and price of '$49.99'
  saucedemoPage.expectFirstItemListToHaveNameText('Sauce Labs Fleece Jacket');
  saucedemoPage.expectFirstItemListToHavePriceText('$49.99');
});
