import { browser } from "@wdio/globals";
import navigationVariables from "./variables.js";

class BC_Navigation {
  //These functions are used to Click on Language icon on top panel (Set it to English (UK))
  get tc_btn_selectLanguage() {
    return browser.$(navigationVariables.headerLanguagePicker);
  }

  get allLanguages() {
    return browser.$$(navigationVariables.allLanguagesLayout);
  }

  get currencyContainer() {
    return browser.$(navigationVariables.currencyContainer);
  }

  get headerLogo() {
    return browser.$(navigationVariables.headerLogo);
  }

  get finalizeBookingContainer() {
    return browser.$(navigationVariables.finalizeBookingContainer);
  }

  get finalizeBookingCloseButton() {
    return browser.$(navigationVariables.btn_FinalizeBookingClose);
  }

  async getSelectedLanguageValue() {
    return (await this.tc_btn_selectLanguage).getAttribute(
      navigationVariables.btn_SelectedLanguage
    );
  }

  async isLanguageSelectIsExist() {
    return (await this.tc_btn_selectLanguage).isExisting();
  }

  async waitForLanguageSelect() {
    return (await this.tc_btn_selectLanguage).waitForClickable();
  }

  async clickLanguage() {
    (await this.tc_btn_selectLanguage).click();
  }

  async clickOnLanguage(text) {
    const languageButtons = await this.allLanguages;

    for (const button of languageButtons) {
      const buttonText = await button.getText();
      if (buttonText.toLowerCase() === text.toLowerCase()) {
        await button.click();
        return; // Clicked the button, exit the loop
      }
    }
  }

  //This functions are used to Click on Currency icon on top panel Set it to Australian Dollar (AUD)
  get tc_btn_selectCurrency() {
    return browser.$(navigationVariables.headerCurrencyPicker);
  }

  get allCurrency() {
    return browser.$$(navigationVariables.allCurrencyLayout);
  }

  async getSelectedCurrencyValue() {
    return (await this.tc_btn_selectCurrency).getAttribute(
      navigationVariables.btn_SelectedCurrency
    );
  }

  async isCurrencySelectIsExist() {
    return (await this.tc_btn_selectCurrency).isExisting();
  }

  async waitForCurrencySelect() {
    return (await this.tc_btn_selectCurrency).waitForClickable();
  }

  async waitForCurrencySelectDisplayed() {
    return (await this.tc_btn_selectCurrency).waitForDisplayed();
  }

  async clickCurrency() {
    await (await this.tc_btn_selectCurrency).waitForDisplayed();
    await (await this.tc_btn_selectCurrency).click();
  }

  async clickOnCurrency(text) {
    await (await this.currencyContainer).waitForDisplayed();
    const currencyButtons = await this.allCurrency;

    for (const button of currencyButtons) {
      await button.waitForDisplayed();
      const buttonText = await button.getText();

      if (buttonText.toLowerCase().includes(text.toLowerCase())) {
        await button.click();
        return; // Clicked the button, exit the loop
      }
    }
  }

  async clickHeaderLogo() {
    await (await this.headerLogo).waitForDisplayed();
    await (await this.headerLogo).click();
  }

  async clickCloseFinalizeBooking() {
    await (await this.finalizeBookingCloseButton).isDisplayed();
    await (await this.finalizeBookingCloseButton).click();
  }

  async isFinalizeBookingContainerDisplayed() {
    return await (await this.finalizeBookingContainer).isDisplayed();
  }
}

export default new BC_Navigation();
