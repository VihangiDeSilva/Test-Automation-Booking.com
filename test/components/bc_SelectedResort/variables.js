const resortTitle = 'div[data-capla-component-boundary="b-property-web-property-page/PropertyHeaderName"] h2';
const roomPrices = 'table[id="hprt-table"] tbody div[class="hprt-price-block "] span[class="prco-valign-middle-helper"]';
const roomTaxPrices = 'table[id="hprt-table"] tbody div[class="hprt-price-block "] div[class*="prd-taxes-and-fees-under-price"]';
const roomSelectors = 'select[data-testid="select-room-trigger"]';
const btn_Reserve = 'div[class="hprt-reservation-cta"]';

export default {
    resortTitle,
    roomPrices,
    roomTaxPrices,
    roomSelectors,
    btn_Reserve
}