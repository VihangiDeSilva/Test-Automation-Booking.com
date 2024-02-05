import {
  BC_SignInPopUp,
  BC_LeftSideFilter,
  BC_Navigation,
  BC_SubNavigation,
  BC_SearchResultDetails,
} from "../../components/index.js";

class PG_SearchResult {
  getNavigation() {
    return BC_Navigation;
  }

  getSubNavigation() {
    return BC_SubNavigation;
  }

  getSignInPopUp() {
    return BC_SignInPopUp;
  }

  getLeftSideFilter() {
    return BC_LeftSideFilter;
  }

  getSearchResultDetails() {
    return BC_SearchResultDetails;
  }

  open(path = "") {
    return browser.url(path);
  }
}

export default new PG_SearchResult();
