import searchLayoutVariables from "./variables.js";

class BC_SearchLayout {
  get inputLocation() {
    return browser.$(searchLayoutVariables.location_input);
  }

  get datePickerContainer() {
    return browser.$(searchLayoutVariables.date_picker_container);
  }

  get datePickerTDSpan() {
    return browser.$$(searchLayoutVariables.date_picker_td_span);
  }

  get inputAdult() {
    return browser.$(searchLayoutVariables.btn_AdultsCountChange);
  }

  get inputChildren() {
    return browser.$(searchLayoutVariables.btn_ChildrenCountChage);
  }

  get inputNoRooms() {
    return browser.$(searchLayoutVariables.btn_RoomsCountChage);
  }

  get searchButton() {
    return browser.$(searchLayoutVariables.btn_search);
  }

  get searchResultContainer() {
    return browser.$(searchLayoutVariables.searchResultContainer);
  }

  get occupantPickerContainer() {
    return browser.$(searchLayoutVariables.occupantPickerContainer);
  }

  async isInputLocationElementDisplayed() {
    return (await this.inputLocation).isDisplayed();
  }

  async setInputLocation(location) {
    if (!this.isInputLocationElementDisplayed) return;
    await (await this.inputLocation).setValue(location);
  }

  async onClickInputLocation(){
    await (await this.inputLocation).click();
  }

  async getInputLocationValue() {
    return await (await this.inputLocation).getValue();
  }

  async openDatePicker() {
    await (await this.datePickerContainer).click();
  }

  async openOccupancyPicker() {
    await (await this.occupantPickerContainer).click();
  }

  async selectDateFromDatePicker(date) {
    const tdSpanCells = await this.datePickerTDSpan;
    await tdSpanCells.forEach(async (cell) => {
      const dataDate = await cell.getAttribute(searchLayoutVariables.date_data);
      if (date === dataDate) {
        await cell.click();
        return;
      }
    });
  }

  async setCheckInDate(date) {
    await this.selectDateFromDatePicker(date);
  }

  async setCheckOutDate(date) {
    await this.selectDateFromDatePicker(date);
  }

  async selectDateRange(checkInDate, checkOutDate) {
    await this.openDatePicker();
    await this.setCheckInDate(checkInDate);
    await this.setCheckOutDate(checkOutDate);
  }

  async isDateSelected(date) {
    const tdSpanCells = await this.datePickerTDSpan;
    let isSelected = false;
    await tdSpanCells.forEach(async (cell) => {
      const dataDate = await cell.getAttribute(searchLayoutVariables.date_data);
      const ariaChecked = await cell.getAttribute(
        searchLayoutVariables.aria_checked
      );
      if (date === dataDate && ariaChecked) {
        console.info(dataDate, ariaChecked);
        isSelected = true;
      }
    });
    return isSelected;
  }

  async isCheckInDateSelected(date) {
    return await this.isDateSelected(date);
  }

  async isCheckOutDateSelected(date) {
    return await this.isDateSelected(date);
  }

  async isDateRangeSelected(checkInDate, checkOutDate) {
    await this.openDatePicker();
    const isCheckInDateSelected = await this.isCheckInDateSelected(checkInDate);
    const isCheckOutDateSelected = await this.isCheckOutDateSelected(
      checkOutDate
    );
    return isCheckInDateSelected && isCheckOutDateSelected;
  }

  async setAdultCount(count) {
    await this.openOccupancyPicker();
  }

  async onClickSearchBtn() {
    await (await this.searchButton).click();
  }

  async isSearchResultContainerExist() {
    return await (await this.searchResultContainer).isExisting();
  }

}

export default new BC_SearchLayout();
