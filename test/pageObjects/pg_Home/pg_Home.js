import {
  BC_SignInPopUp,
  BC_Navigation,
  BC_SubNavigation,
  BC_SearchLayout,
} from "../../components/index.js";

class PG_Home {
  getNavigation() {
    return BC_Navigation;
  }

  getSubNavigation() {
    return BC_SubNavigation;
  }

  getSignInPopUp() {
    return BC_SignInPopUp;
  }

  getSearchLayout() {
    return BC_SearchLayout;
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

export default new PG_Home();
