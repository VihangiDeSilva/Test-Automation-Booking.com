import subNavigationVariables from "./variables.js";

class BC_SubNavigation {
  get subNavigationBar() {
    return browser.$$(subNavigationVariables.sub_navigation_bar);
  }
  
  async clickOnSubNavigationItem(title) {
    const subNavigationItems = await this.subNavigationBar;
    for (const subNavigationItem of subNavigationItems) {
      const navigationItem = await subNavigationItem.getText();
      if (title === navigationItem) {
        await subNavigationItem.click();
        return;
      }
    }
  }

  async getSelectedSubNavigationItem() {
    const subNavigationItems = await this.subNavigationBar;
    for (const subNavigationItem of subNavigationItems) {
      const navigationItem = await subNavigationItem.$('[aria-current="page"]');
      return await navigationItem.getText();
    }
  }
}

export default new BC_SubNavigation();
