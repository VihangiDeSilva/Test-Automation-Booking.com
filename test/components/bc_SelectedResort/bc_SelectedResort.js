import { extractNumericPart } from "../../utils/index.js";
import selectedResortsVariables from "./variables.js";

class BC_SelectedResort {
  get resortTitle() {
    return browser.$(selectedResortsVariables.resortTitle);
  }

  get roomPrices() {
    return browser.$$(selectedResortsVariables.roomPrices);
  }

  get roomTaxPrices() {
    return browser.$$(selectedResortsVariables.roomTaxPrices);
  }

  get roomSelectors() {
    return browser.$$(selectedResortsVariables.roomSelectors);
  }

  get reserveBtn() {
    return browser.$(selectedResortsVariables.btn_Reserve);
  }

  async getResortTitle() {
    return await (await this.resortTitle).getText();
  }

  async getRowNumberOfMatchRoomPriceOfTotal(total) {
    const roomPriceElements = await this.roomPrices;
    let rowNumber = 0;
    for (const [index, element] of roomPriceElements.entries()) {
      let roomPrice = await element.getText();
      roomPrice = extractNumericPart(roomPrice);
      if (roomPrice === total) {
        rowNumber = index + 1;
        break;
      }
    }
    return rowNumber;
  }

  async getRowNumberOfMatchRoomPriceOfTax(tax) {
    const roomPriceElements = await this.roomTaxPrices;
    let rowNumber = 0;
    for (const [index, element] of roomPriceElements.entries()) {
      let roomTaxPrice = await element.getText();
      roomTaxPrice = extractNumericPart(roomTaxPrice);
      if (roomTaxPrice === tax) {
        rowNumber = index + 1;
        break;
      }
    }
    return rowNumber;
  }

  async selectRoom(rowNumber) {
    const roomSelectorElement = await this.roomSelectors;
    for (const [index, element] of roomSelectorElement.entries()) {
      if (index + 1 === rowNumber) {
        await element.click();
        const options = await element.$(`option[value="${1}"]`);
        await options.waitForDisplayed();
        await options.click();
        break;
      }
    }
  }

  async getSelectRoomCount(rowNumber) {
    const roomSelectorElement = await this.roomSelectors;
    let roomCount = 0;
    for (const [index, element] of roomSelectorElement.entries()) {
      if (index + 1 === rowNumber) {
        roomCount = Number(await element.getValue());
        break;
      }
    }

    return roomCount;
  }

  async onClickReserveButton() {
    await (await this.reserveBtn).waitForClickable();
    await (await this.reserveBtn).click();
  }
}

export default new BC_SelectedResort();
