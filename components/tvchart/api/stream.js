import historyProvider from "./historyProvider.js";
import Cookies from "js-cookie";

const webSocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

let _subs = [];
let processId = -1;

const methods = {
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {},
  unsubscribeBars: (subscriberUID) => {
    var subIndex = _subs.findIndex(
      (item) => item.subscriberUID === subscriberUID
    );
    if (subIndex === -1) {
      console.log("No subscription found for ", subscriberUID);
      return;
    }
    _subs.splice(subIndex, 1);
  },
};

const updateBar = (data, sub) => {
  let lastBar = sub.lastBar;
  let resolution = sub.resolution;
  if (resolution.includes("D")) {
    resolution = 1440;
  } else if (resolution.includes("W")) {
    resolution = 10080;
  } else if (resolution.includes("M")) {
    resolution = 43200;
  }
  let second = resolution * 60;
  let rounded = Math.floor(data.ts / second) * second;
  let lastBarSec = lastBar.time;
  let _lastBar;

  if (rounded > lastBarSec) {
    _lastBar = {
      time: rounded,
      low: lastBar.close,
      high: lastBar.close,
      open: lastBar.close,
      close: data.price,
      volume: data.volume,
    };
  } else {
    if (data.price < lastBar.low) {
      lastBar.low = data.price;
    } else if (data.price > lastBar.high) {
      lastBar.high = data.price;
    }

    lastBar.volume += data.volume;
    lastBar.close = data.price;
    _lastBar = lastBar;
  }
  return _lastBar;
};

export default methods;
