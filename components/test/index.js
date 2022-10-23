import React, { useEffect, useRef } from "react";
import { widget, version } from "public/static/charting_library";

// import Datafeed from "./api/";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);

  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function Tvchart(props) {
  const ref = useRef();

  useEffect(() => {
    const widgetOptions = {
      symbol: props.symbol,
      datafeed: new Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
      interval: props.interval,
      container: ref.current,
      library_path: props.libraryPath,
      locale: getLanguageFromURL() || "ko",
      disabled_features: props.disabled_features,
      charts_storage_url: props.chartsStorageUrl,
      charts_storage_api_version: props.chartsStorageApiVersion,
      client_id: props.clientId,
      user_id: props.userId,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      theme: props.theme,
      studies_overrides: props.studies_overrides,
      drawings_access: props.drawings_access,
      disabled_features: props.disabled_features,
      enabled_features: props.enabled_features,
      favorites: props.favorites,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "COIN.GG",
            body: "코인거래소",
            callback: () => {},
          })
        );
        button.innerHTML = "COIN.GG";
        const order = tvWidget
          .chart()
          .createOrderLine()
          .setText("매수 평균가")
          .setLineLength(3)
          .setLineStyle(0)
          .setLineColor("#fcd034")
          .setBodyBorderColor("#fcd034")
          .setBodyBackgroundColor("#fcd034")
          .setBodyTextColor("#21252f")
          .setQuantity();
        order.setPrice(117);
      });
    });
  }, [props]);

  return <div ref={ref}></div>;
}

export default Tvchart;

Tvchart.defaultProps = {
  symbol: "BTCKRW",
  interval: "4h",
  datafeedUrl: process.env.NEXT_PUBLIC_DATA_FEED_URL,
  libraryPath: "/static/charting_library/",
  chartsStorageUrl: "https://saveload.tradingview.com",
  chartsStorageApiVersion: "1.1",
  clientId: "coin.gg",
  userId: "public_user_id",
  fullscreen: false,
  autosize: true,
  studies_overrides: {
    "volume.volume.color.0": "#88b0e1",
    "volume.volume.color.1": "#e3a498",
  },
  drawings_access: { type: "black", tools: [{ name: "Regression Trend" }] },
  disabled_features: [
    "header_symbol_search",
    "header_screenshot",
    "header_saveload",
    "header_interval_dialog_button",
    "timeframes_toolbar",
    "volume_force_overlay",
    // "use_localstorage_for_settings",
    "save_chart_properties_to_local_storage",
  ],
  enabled_features: [
    "keep_left_toolbar_visible_on_small_screens",
    "left_toolbar",
  ],
  favorites: {
    intervals: ["1", "5", "15", "30", "1H", "4H", "1D"],
  },
};
