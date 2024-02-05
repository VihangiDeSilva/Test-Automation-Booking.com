import { BC_SelectedResort } from "../../components/index.js";

class PG_Resort {
  getNavigation() {
    return BC_Navigation;
  }

  getSubNavigation() {
    return BC_SubNavigation;
  }

  getSignInPopUp() {
    return BC_SignInPopUp;
  }

  getSelectedResort() {
    return BC_SelectedResort;
  }

  open(path = "") {
    return browser.url(path);
  }

  async handleSignInPopUP() {
    const isOverlappingDivDisplayed =
      await this.getSignInPopUp().isSignInDismissIconDisplayedWithinTimeout();

    if (isOverlappingDivDisplayed) {
      await this.getSignInPopUp().clickSignInDismissIcon();
    }
  }
}

export default new PG_Resort();
