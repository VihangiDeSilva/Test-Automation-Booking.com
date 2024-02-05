import signInPopUpVariables from "./variables.js";

class BC_SignInPopUp {

  async getSignInDismissIcon(){
    return await browser.$(signInPopUpVariables.btn_close);
  }

  async isSignInDismissIconDisplayed() {
    return (await this.getSignInDismissIcon()).isDisplayed();
  }

  async isSignInDismissIconExisting() {
    return (await this.getSignInDismissIcon()).isExisting();
  }

  async waitForSignInPopup(timeout = 1000) {
    return (await this.getSignInDismissIcon()).waitForDisplayed({timeout});
  }

  // Function to check if the element is displayed within a timeout
  async isSignInDismissIconDisplayedWithinTimeout(timeout = 1000) {
    try {
      await this.waitForSignInPopup(timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  async clickSignInDismissIcon() {
    (await this.getSignInDismissIcon()).click();
  }
}

export default new BC_SignInPopUp();
