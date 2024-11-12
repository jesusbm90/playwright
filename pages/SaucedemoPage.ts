import { expect, Page, Locator } from '@playwright/test';

export class SaucedemoPage {
  readonly page: Page;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;
  readonly activeProductOption: Locator;
  readonly productSortList: Locator;

  constructor(page: Page) {
    // Define locators
    this.page = page;
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrice = page.locator(
      '[data-test="inventory-item-price"]'
    );
    this.activeProductOption = page.locator('[data-test="active-option"]');
    this.productSortList = page.locator(
      'select[data-test="product-sort-container"]'
    );
  }

  //TODO for whoever reason, it's not performing the action
  async sortByOption(label: string) {
    await this.productSortList.selectOption({ label: label });
  }

  async expectActiveProductOptionToHaveText(expectedText: string) {
    await expect(this.activeProductOption).toHaveText(expectedText);
  }

  async expectFirstItemListToHaveNameText(expectedText: string) {
    await expect(this.inventoryItemName.first()).toHaveText(expectedText);
  }

  async expectFirstItemListToHavePriceText(expectedPrice: string) {
    await expect(this.inventoryItemPrice.first()).toHaveText(expectedPrice);
  }
}
