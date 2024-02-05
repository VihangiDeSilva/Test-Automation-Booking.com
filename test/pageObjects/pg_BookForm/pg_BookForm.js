import { BC_EnterYourDetails, BC_Navigation } from "../../components/index.js";

class PG_BookForm {
  getEnterYourDetails() {
    return BC_EnterYourDetails;
  }

  getNavigation() {
    return BC_Navigation;
  }
}

export default new PG_BookForm();
