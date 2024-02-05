import leftSideFilterVaribles from "./variables.js";

class BC_LeftSideFilter {
  get fiveStarPropertyRating() {
    return browser.$(leftSideFilterVaribles.fiveStarPropertyRating);
  }

  get fiveStarCheckbox() {
    return browser.$(leftSideFilterVaribles.chk_FiveStar);
  }

  get propertyRatingContainer(){
    return browser.$(leftSideFilterVaribles.propertyRatingContainer);
  }

  //These functions are used to select '5 star' rating in property rating
  async onClickFiveStarPropertyRating() {
    await (await this.propertyRatingContainer).waitForDisplayed();
    await (await this.fiveStarPropertyRating).waitForClickable();
    await (await this.fiveStarPropertyRating).click();
  }

  async isFiveStarCheckboxSelected() {
    return await (await this.fiveStarCheckbox).isSelected();
  }

}

export default new BC_LeftSideFilter();
