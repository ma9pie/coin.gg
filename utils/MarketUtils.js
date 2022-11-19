const MarketUtils = () => {};

/**
 * 원화 마켓 주문 가격 단위
 * @param {Number} price 원화 가격
 * @returns 
 */
MarketUtils.krwMarketOrderPriceUnit = (price) => {
  if (price >= 2000000) {
  } else if (price >= 1000000) {
    return 1000;
  } else if (price >= 500000) {
    return 500;
  } else if (price >= 100000) {
    return 100;
  } else if (price >= 10000) {
    return 50;
  } else if (price >= 1000) {
    return 10;
  } else if (price >= 100) {
    return 5;
  } else if (price >= 10) {
    return 1;
  } else if (price >= 1) {
    return 0.1;
  } else if (price >= 0.1) {
    return 0.01;
  } else if (price >= 0) {
    return 0.001;
  } else {
    return 0.0001;
  }
};

export default MarketUtils;
