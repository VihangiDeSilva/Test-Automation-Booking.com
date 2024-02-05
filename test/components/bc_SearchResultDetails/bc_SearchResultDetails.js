import { extractNumericPart } from "../../utils/index.js";
import searchResultDetailsVariables from "./variables.js";

class BC_SearchResult {
  get searchLocationTitle() {
    return browser.$(searchResultDetailsVariables.searchLocationTitle);
  }

  get sortByBtn() {
    return browser.$(searchResultDetailsVariables.btn_SortBy);
  }

  get sortBtnContainer() {
    return browser.$(searchResultDetailsVariables.sortBtnContainer);
  }

  get priceSortBtn() {
    return browser.$(searchResultDetailsVariables.btn_PriceSort);
  }

  get searchResultTitles() {
    return browser.$$(searchResultDetailsVariables.searchResultTitles);
  }

  get searchResultLinks() {
    return browser.$$(searchResultDetailsVariables.lnk_SearchResultLinks);
  }

  get priceAndDiscountPrices() {
    return browser.$$(searchResultDetailsVariables.priceAndDiscountPrices);
  }

  get taxesAndCharges() {
    return browser.$$(searchResultDetailsVariables.taxesAndCharges);
  }

  get searchResultSpinner() {
    return browser.$(searchResultDetailsVariables.spn_SearchResult);
  }

  get searchResultSkeletonLoader() {
    return browser.$(searchResultDetailsVariables.searchResultSkeletonLoader);
  }

  async getSearchLocationTitleDetails() {
    return await (await this.searchLocationTitle).getText();
  }

  async waitForSearchResults(timeout = 10000) {
    await browser.waitUntil(
      async () => {
        const isSpinnerDisplayed = await (
          await this.searchResultSpinner
        ).isDisplayed();
        const isSkeletonLoaderDisplayed = await (
          await this.searchResultSkeletonLoader
        ).isDisplayed();
        console.info(
          "waitForSearchResults isSkeletonLoaderDisplayed ",
          isSkeletonLoaderDisplayed,
          " isSpinnerDisplayed ",
          isSpinnerDisplayed
        );
        return (!isSkeletonLoaderDisplayed && !isSpinnerDisplayed);
      },
      {
        timeout, // maximum wait time in milliseconds
        timeoutMsg: "The page did not fully load within the specified time.",
      }
    );
  }

  async onClickSortByButton() {
    await (await this.sortByBtn).waitForDisplayed();
    await (await this.sortByBtn).click();
  }

  async onClickPriceSortButton() {
    await this.waitForSearchResults();
    await (await this.priceSortBtn).waitForDisplayed();
    await (await this.priceSortBtn).click();
  }

  async isPriceSelectedAsSort() {
    const selectedSort = await (
      await this.sortByBtn
    ).getAttribute("data-selected-sorter");
    return selectedSort && selectedSort === "price";
  }

  async getSearchResultTitle(searchResultNumber) {
    await this.waitForSearchResults();
    const elements = await this.searchResultTitles;
    let title = "";
    for (const [index, element] of elements.entries()) {
      if (index + 1 === searchResultNumber) {
        await element.waitForClickable();
        title = await element.getText();
        break; // Stop the loop once the desired object is found
      }
    }
    return title;
  }

  async getResortTotalPrice(searchResultNumber) {
    await this.waitForSearchResults();
    const elements = await this.priceAndDiscountPrices;
    let total = 0;
    for (const [index, element] of elements.entries()) {
      if (index + 1 === searchResultNumber) {
        await element.waitForClickable();
        const totalPrice = await element.getText();
        total = extractNumericPart(totalPrice);
        break; // Stop the loop once the desired object is found
      }
    }
    return total;
  }

  async getResortTaxPrice(searchResultNumber) {
    await this.waitForSearchResults();
    const elements = await this.taxesAndCharges;
    let tax = 0;
    for (const [index, element] of elements.entries()) {
      if (index + 1 === searchResultNumber) {
        await element.waitForClickable();
        const taxPrice = await element.getText();
        tax = extractNumericPart(taxPrice);
        break; // Stop the loop once the desired object is found
      }
    }
    return tax;
  }

  async onClickSearchResult(searchResultNumber) {
    await this.waitForSearchResults();
    const elements = await this.searchResultLinks;
    for (const [index, element] of elements.entries()) {
      console.info(
        "index + 1 ",
        index + 1,
        " searchResultNumber ",
        searchResultNumber
      );
      if (index + 1 === searchResultNumber) {
        await element.waitForDisplayed();
        await element.click();
        break; // Stop the loop once the desired object is found
      }
    }
  }
}

export default new BC_SearchResult();
