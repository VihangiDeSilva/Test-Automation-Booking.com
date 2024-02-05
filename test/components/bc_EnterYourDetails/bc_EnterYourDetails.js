import moment from "moment";
import { extractNumericPart } from "../../utils/index.js";
import enterYourDetailsVariables from "./variables.js"; 

class BC_EnterYourDetails {
  get bookForm() {
    return browser.$(enterYourDetailsVariables.bookingDetailsForm);
  }

  get leavingUsersModal() {
    return browser.$(enterYourDetailsVariables.leavingUsersModal);
  }

  get leavingUsersModalCloseButton() {
    return browser.$(enterYourDetailsVariables.btn_LeavingUsersModalClose);
  }

  get checkInDateLabel() {
    return browser.$(enterYourDetailsVariables.lbl_CheckInDateLabel);
  }

  get checkOutDateLabel() {
    return browser.$(enterYourDetailsVariables.lbl_CheckOutDateLabel);
  }

  get summaryTotalPrice() {
    return browser.$(enterYourDetailsVariables.summaryTotalPrice);
  }

  get summaryTaxPrice() {
    return browser.$(enterYourDetailsVariables.summaryTaxPrice);
  }

  get firstNameInput() {
    return browser.$(enterYourDetailsVariables.tf_FirstName);
  }

  get lastNameInput() {
    return browser.$(enterYourDetailsVariables.tf_LastName);
  }

  get emailAddressInput() {
    return browser.$(enterYourDetailsVariables.tf_EmailAddress);
  }

  get phoneInput() {
    return browser.$(enterYourDetailsVariables.tf_PhoneNumber);
  }

  get finalDetailsButton() {
    return browser.$(enterYourDetailsVariables.btn_FinalDetails);
  }

  get currentSelectStep() {
    return browser.$(enterYourDetailsVariables.currentSelectStep);
  }

  get cardDetailContainer() {
    return browser.$(enterYourDetailsVariables.cardDetailContainer);
  }

  //Check whether the booking form is displayed
  async isBookFormDisplayed() {
    await (await this.bookForm).waitForDisplayed();
    return await (await this.bookForm).isDisplayed();
  }

  //change the date format
  extractDate(input) {
    // Parsing the input string using moment
    const parsedDate = moment(input, "dddd DD MMMM YYYY", "en");

    if (parsedDate.isValid()) {
      return parsedDate.format("YYYY-MM-DD");
    }
    return null;
  }

  //These functions are used to dismiss the leaving users modal if it exist
  async isLeavingUsersModalPopUpDisplayedWithinTimeout(timeout = 10000) {
    try {
      await (await this.leavingUsersModal).waitForDisplayed({ timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  async clickLeavingUsersModalCloseButton() {
    await (await this.leavingUsersModalCloseButton).waitForClickable();
    await (await this.leavingUsersModalCloseButton).click();
  }

  async handleLeavingUsersModal() {
    const isOverlappingDivDisplayed =
      await this.isLeavingUsersModalPopUpDisplayedWithinTimeout();

    if (isOverlappingDivDisplayed) {
      await this.clickLeavingUsersModalCloseButton();
    }
  }

  //get Check In date
  async getCheckInDate() {
    (await this.checkInDateLabel).waitForDisplayed();
    const fetchedDate = await (await this.checkInDateLabel).getText();
    return this.extractDate(fetchedDate);
  }

  //get check out date
  async getCheckOutDate() {
    (await this.checkOutDateLabel).waitForDisplayed();
    const fetchedDate = await (await this.checkOutDateLabel).getText();
    return this.extractDate(fetchedDate);
  }

  //get total price summary
  async getSummaryTotalPrice() {
    (await this.summaryTotalPrice).waitForDisplayed();
    const fetchedPrice = await (await this.summaryTotalPrice).getText();
    return extractNumericPart(fetchedPrice);
  }

  //get tax summary
  async getSummaryTaxPrice() {
    (await this.summaryTaxPrice).waitForDisplayed();
    const fetchedPrice = await (await this.summaryTaxPrice).getText();
    return extractNumericPart(fetchedPrice);
  }

  //These functions are used to get all mandatory user details for “Enter your details” form
  async setFirstName(firstName) {
    await (await this.firstNameInput).waitForDisplayed();
    await (await this.firstNameInput).setValue(firstName);
  }

  async getFirstNameInputValue() {
    await (await this.firstNameInput).waitForDisplayed();
    return await (await this.firstNameInput).getValue();
  }

  async setLastName(lastName) {
    await (await this.lastNameInput).waitForDisplayed();
    await (await this.lastNameInput).setValue(lastName);
  }

  async getLastNameInputValue() {
    await (await this.lastNameInput).waitForDisplayed();
    return await (await this.lastNameInput).getValue();
  }

  async setEmail(email) {
    await (await this.emailAddressInput).waitForDisplayed();
    await (await this.emailAddressInput).setValue(email);
  }

  async getEmailInputValue() {
    await (await this.emailAddressInput).waitForDisplayed();
    return await (await this.emailAddressInput).getValue();
  }

  async setPhone(phone) {
    await (await this.phoneInput).waitForDisplayed();
    await (await this.phoneInput).setValue(phone);
  }

  async getPhoneInputValue() {
    await (await this.phoneInput).waitForDisplayed();
    return await (await this.phoneInput).getValue();
  }

  async setPersonalDetails({ firstName, lastName, email, phone }) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setEmail(email);
    await this.setPhone(phone);
  }

  async getPhoneInputPlaceholder() {
    return await (await this.phoneInput).getAttribute("placeholder");
  }

  removeStartString(inputString, startString) {
    if (inputString.startsWith(startString)) {
      return inputString.substring(startString.length);
    }
    return inputString;
  }

  async getPersonalDetails() {
    const firstName = await this.getFirstNameInputValue();
    const lastName = await this.getLastNameInputValue();
    const email = await this.getEmailInputValue();
    const phone = await this.getPhoneInputValue();
    const phonePlaceholder = await this.getPhoneInputPlaceholder();
    const formattedPhone = this.removeStartString(phone, phonePlaceholder);
    return {
      firstName,
      lastName,
      email,
      phone: formattedPhone,
    };
  }

  async submitBookingDetails() {
    await (await this.finalDetailsButton).waitForClickable();
    await (await this.finalDetailsButton).click();
  }

  async getCurrentSelectedStep() {
    return await (await this.currentSelectStep).getText();
  }

  async waitCardDetailContainerDisplayed() {
    await (await this.cardDetailContainer).waitForDisplayed();
  }
}

export default new BC_EnterYourDetails();
