import {
  PG_Home,
  PG_SearchResult,
  PG_Resort,
  PG_Main,
  PG_BookForm,
} from "../pageObjects/index.js";
import { getDate } from "../utils/index.js";
import { SelectedResort } from "../store/index.js";

/*
This methord is used to navigate the booking.com website
*/
describe("Booking.com End-to-End Test", () => {
  it("should navigate to the booking.com website", async () => {
    await browser.maximizeWindow();
    await PG_Home.open();
    const currentURL = await browser.getUrl();
    expect(currentURL).toBe("https://www.booking.com/");
  });

  /*
  This method is used to dismiss the sign-in pop-up if it exists
  */
  it("should dismiss the sign in pop up if it exist", async () => {
    const isSignInDismissIconExisting =
      await PG_Home.getSignInPopUp().isSignInDismissIconDisplayedWithinTimeout(
        5000
      );
    if (isSignInDismissIconExisting)
      await PG_Home.getSignInPopUp().clickSignInDismissIcon();
  });

  /*
  This method is used to Click on Language icon on top panel and Set it to English (UK)
  */
  it("should set language to English (UK)", async () => {
    await PG_Home.getNavigation().waitForLanguageSelect();
    await PG_Home.getNavigation().clickLanguage();
    await PG_Home.getNavigation().clickOnLanguage("English (UK)");
    const value = await PG_Home.getNavigation().getSelectedLanguageValue();
    expect(value).toBe("Language: English (UK)");
  });

  /*
  This method is used to Click on Currency icon on top panel Set it to Australian Dollar (AUD)
  */
  it("should set currency to AUD ", async () => {
    await PG_Home.getNavigation().clickCurrency();
    await PG_Home.getNavigation().clickOnCurrency("Australian Dollar");
    const value = await PG_Home.getNavigation().getSelectedCurrencyValue();
    expect(value).toBe("Prices in Australian Dollar");
  });

  /*
  This method is used to click on the “Stays” Tab on top panel 
  */
  it("should click on the 'Stays' Tab on top panel", async () => {
    const subNavigationItem = "Stays";
    await PG_Home.getSubNavigation().clickOnSubNavigationItem(
      subNavigationItem
    );
    const selectedSubNavigation =
      await PG_Home.getSubNavigation().getSelectedSubNavigationItem();
    expect(selectedSubNavigation).toBe(subNavigationItem);
  });

  /*
  This method is used to type Any location in “Where are you going” text field
  */
  it("should type Any location in 'Where are you going' text field", async () => {
    const location = "Kandy";
    await PG_Home.getSearchLayout().setInputLocation(location);
    await PG_Home.getSearchLayout().onClickInputLocation();
    const currentInputLocation =
      await PG_Home.getSearchLayout().getInputLocationValue();

    expect(currentInputLocation).toBe(location);
  });

  /*
  This method is used to select the Check-in and Checkout
  */
  it("should select the Check-in and Checkout", async () => {
    const checkInDate = getDate(undefined, 1);
    const checkOutDate = getDate(checkInDate, 2);
    await PG_Home.getSearchLayout().selectDateRange(checkInDate, checkOutDate);
    const isDateRangeSelected =
      await PG_Home.getSearchLayout().isDateRangeSelected(
        checkInDate,
        checkOutDate
      );
    SelectedResort.tripDuration = {
      checkInDate,
      checkOutDate,
    };
    expect(isDateRangeSelected).toBe(true);
  });

  /*
  This method is used to Select 1 adults and 0 children and 1 room and verify it
  */
  it.skip("should select 1 adult, 0 children and 1 room ", async () => { });

  /*
  This method is used to click on the Search button
  */
  it("should click on the 'Search' button", async () => {
    await PG_Home.getSearchLayout().onClickSearchBtn();

    const isSearchResultContainerExist =
      await PG_Home.getSearchLayout().isSearchResultContainerExist();
    expect(isSearchResultContainerExist).toBe(true);
  });

  /*
  This method is used to verify the Search Location is correct
  */
  it("should verify the search location is correct.", async () => {
    const currentSearchResultTitle =
      await PG_SearchResult.getSearchResultDetails().getSearchLocationTitleDetails();
    const enteredLocation =
      await PG_Home.getSearchLayout().getInputLocationValue();
    expect(currentSearchResultTitle).toContain(enteredLocation);
  });

  /*
  This method is used to select '5 star' rating in the property rating
  */
  it("should select '5 star' rating in property rating", async () => {
    await PG_SearchResult.getLeftSideFilter().onClickFiveStarPropertyRating();
    const isFiveStarCheckboxSelected =
      await PG_SearchResult.getLeftSideFilter().isFiveStarCheckboxSelected();
    expect(isFiveStarCheckboxSelected).toBe(true);
  });

  /*
  This method is used to select the sort by 'price (lowest first)' in top panel in search result
  */
  it("should select the sort by 'price (lowest first)' in top panel in search result", async () => {
    await PG_SearchResult.getSearchResultDetails().onClickSortByButton();
    await PG_SearchResult.getSearchResultDetails().onClickPriceSortButton();
    const isPriceSelectedAsSort =
      await PG_SearchResult.getSearchResultDetails().isPriceSelectedAsSort();
    expect(isPriceSelectedAsSort).toBe(true);
  });

  /*
  This method is used to get the name and amount with the tax of the second item from the search List page
  */
  it("should be able to store the second search result ", async () => {
    const searchResultNumber = 2;

    const title =
      await PG_SearchResult.getSearchResultDetails().getSearchResultTitle(
        searchResultNumber
      );
    const totalPrice =
      await PG_SearchResult.getSearchResultDetails().getResortTotalPrice(
        searchResultNumber
      );
    const taxPrice =
      await PG_SearchResult.getSearchResultDetails().getResortTaxPrice(
        searchResultNumber
      );
    SelectedResort.resortPrice.totalAmount = totalPrice;
    SelectedResort.resortPrice.taxAmount = taxPrice;
    SelectedResort.resortName = title;
    expect(SelectedResort.resortName).toBe(title);
    expect(SelectedResort.resortPrice.totalAmount).toBe(totalPrice);
    expect(SelectedResort.resortPrice.taxAmount).toBe(taxPrice);
  });

  /*
  This method is used to click the second item from the search List page and navigate to the hotel Detail page and 
  verify the hotel name
  */
  it("should navigate to the second search result", async () => {
    const searchResultNumber = 2;

    await PG_SearchResult.getSearchResultDetails().onClickSearchResult(
      searchResultNumber
    );
    await PG_Main.switchNextWindow();
    const resortTile = await PG_Resort.getSelectedResort().getResortTitle();
    expect(SelectedResort.resortName).toBe(resortTile);
  });

  /*
  This method is used to select the room against the amount and tax that store in previous page
  */
  it("should select the room against the amount and tax that was stored", async () => {
    const selectedTax = SelectedResort.resortPrice.taxAmount;
    const selectedTotal = SelectedResort.resortPrice.totalAmount;
    const totalRowNumber =
      await PG_Resort.getSelectedResort().getRowNumberOfMatchRoomPriceOfTotal(
        selectedTotal
      );
    const taxRowNumber =
      await PG_Resort.getSelectedResort().getRowNumberOfMatchRoomPriceOfTax(
        selectedTax
      );

    await PG_Resort.getSelectedResort().selectRoom(taxRowNumber);
    const selectedRoomCount =
      await PG_Resort.getSelectedResort().getSelectRoomCount(taxRowNumber);

    expect(selectedRoomCount).toBe(1);
  });

  /*
  This method is used to click on I’ll reserve button
  */
  it("should click on the 'I'll reserve' button", async () => {
    await PG_Resort.getSelectedResort().onClickReserveButton();
    const isBookFormDisplayed =
      await PG_BookForm.getEnterYourDetails().isBookFormDisplayed();
    expect(isBookFormDisplayed).toBe(true);
  });

  /*
  This method is used to dismiss the leaving users modal if it exist
  */
  it("should dismiss the leaving users modal if it exist", async () => {
    await PG_BookForm.getEnterYourDetails().handleLeavingUsersModal();
  });

  /*
  This method is used to verify the checkout date & checkin date
  */
  it("should verify the checkout date & checkin date", async () => {
    const extractedCheckInDate =
      await PG_BookForm.getEnterYourDetails().getCheckInDate();
    const extractedCheckOutDate =
      await PG_BookForm.getEnterYourDetails().getCheckOutDate();
    expect(extractedCheckInDate).toBe(SelectedResort.tripDuration.checkInDate);
    expect(extractedCheckOutDate).toBe(
      SelectedResort.tripDuration.checkOutDate
    );
  });

  /*
  This method is used to verify total payable amount
  */
  it("should verify total payable amount", async () => {
    const extractedTotalPrice =
      await PG_BookForm.getEnterYourDetails().getSummaryTotalPrice();
    const extractedTaxPrice =
      await PG_BookForm.getEnterYourDetails().getSummaryTaxPrice();
    const roundedTotalPrice = Math.round(Number(extractedTotalPrice));
    expect(roundedTotalPrice).toBe(SelectedResort.resortPrice.totalAmount);
    expect(extractedTaxPrice).toBe(SelectedResort.resortPrice.taxAmount);
  });

  /*
  This method is used to  fill all the mandatory fields in “Enter your details” form 
  */
  it("should fill all the mandatory fields", async () => {
    const personalData = {
      email: "johnsmiths@gmail.com",
      firstName: "John",
      lastName: "Smiths",
      phone: "753420356",
    };

    await PG_BookForm.getEnterYourDetails().setPersonalDetails({
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      email: personalData.email,
      phone: personalData.phone,
    });

    const extractedPersonalDetails =
      await PG_BookForm.getEnterYourDetails().getPersonalDetails();

    expect(extractedPersonalDetails.firstName).toBe(personalData.firstName);
    expect(extractedPersonalDetails.lastName).toBe(personalData.lastName);
    expect(extractedPersonalDetails.email).toBe(personalData.email);
    expect(extractedPersonalDetails.phone).toBe(personalData.phone);
  });

  /*
  This method is used to click on "Next: Final details" button
  */
  it("should click on the 'Next: Final details' button", async () => {
    const finalStepNumber = 3;
    await PG_BookForm.getEnterYourDetails().submitBookingDetails();
    await PG_BookForm.getEnterYourDetails().waitCardDetailContainerDisplayed();

    const currentSelectedStep =
      await PG_BookForm.getEnterYourDetails().getCurrentSelectedStep();
    expect(Number(currentSelectedStep)).toBe(finalStepNumber);
  });

  /*
  This method is used to verify check-in and check-out in final step
  */
  it("should verify check-in and check-out in final step", async () => {
    const extractedCheckInDate =
      await PG_BookForm.getEnterYourDetails().getCheckInDate();
    const extractedCheckOutDate =
      await PG_BookForm.getEnterYourDetails().getCheckOutDate();
    expect(extractedCheckInDate).toBe(SelectedResort.tripDuration.checkInDate);
    expect(extractedCheckOutDate).toBe(
      SelectedResort.tripDuration.checkOutDate
    );
  });

  /*
  This method is used to verify total payable amount in final step
  */
  it("should verify total payable amount in final step", async () => {
    const extractedTotalPrice =
      await PG_BookForm.getEnterYourDetails().getSummaryTotalPrice();
    const extractedTaxPrice =
      await PG_BookForm.getEnterYourDetails().getSummaryTaxPrice();
    const roundedTotalPrice = Math.round(Number(extractedTotalPrice));
    expect(roundedTotalPrice).toBe(SelectedResort.resortPrice.totalAmount);
    expect(extractedTaxPrice).toBe(SelectedResort.resortPrice.taxAmount);
  });

  /*
  This method is used to click on Booking.com top logo and navigate to the home page
  */
  it("should click on Booking.com logo to navigate to home page", async () => {
    await PG_BookForm.getNavigation().clickHeaderLogo();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/index.en-gb.html");
  });

  /*
  This method is used to remove the checkout hotel and verify it is not present
  */
  it("should remove checkout hotel and verify it is not present", async () => {
    const isFinalizeBookingContainerDisplayed =
      await PG_BookForm.getNavigation().isFinalizeBookingContainerDisplayed();

    expect(isFinalizeBookingContainerDisplayed).toBe(false);
  });
});
