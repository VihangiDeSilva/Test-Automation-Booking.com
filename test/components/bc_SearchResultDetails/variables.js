const searchLocationTitle = 'div[data-capla-component-boundary="b-search-web-searchresults/SearchResultsDesktop"] h1[aria-live="assertive"]';
const btn_SortBy = 'button[data-testid="sorters-dropdown-trigger"]';
const sortBtnContainer = 'div[data-testid="sorters-dropdown"]';
const btn_PriceSort = 'button[data-id="price"]';
const searchResultTitles = 'div[data-testid="title"]';
const lnk_SearchResultLinks = 'div[data-testid="property-card"] div[data-testid="property-card-container"] a[data-testid="title-link"]';
const priceAndDiscountPrices = 'span[data-testid="price-and-discounted-price"]';
const taxesAndCharges = 'div[data-testid="taxes-and-charges"]';
const spn_SearchResult = 'div[data-testid="overlay-wrapper"] div[role="alert"] div[role="progressbar"]';
const searchResultSkeletonLoader = 'div[data-testid="skeleton-loader"]';

export default {
    searchLocationTitle,
    btn_SortBy,
    sortBtnContainer,
    btn_PriceSort,
    searchResultTitles,
    lnk_SearchResultLinks,
    priceAndDiscountPrices,
    taxesAndCharges,
    spn_SearchResult,
    searchResultSkeletonLoader,
}