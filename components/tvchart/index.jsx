import Datafeed from "./api";
import historyProvider from "./api/historyProvider.js";
import styled from "@emotion/styled";
import { widget } from "public/static/charting_library";
import customOverrides from "public/static/customOverrides.json";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Loading from "@/components/common/Loading";

let tvWidget;
let interval =
  localStorage.getItem("tradingview.chart.lastUsedTimeBasedResolution") || "60";

function Tvchart(props) {
  let overrides = { ...customOverrides };
  const ref = useRef();

  const [isLoadStudy, setIsLoadStudy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 차트 생성
  useEffect(() => {
    const widgetOptions = {
      symbol: props.symbol,
      datafeed: Datafeed,
      interval: props.interval,
      time_frames: props.time_frames,
      container: ref.current,
      library_path: props.libraryPath,
      locale: "ko",
      timezone: props.timezone,
      charts_storage_url: props.chartsStorageUrl,
      charts_storage_api_version: props.chartsStorageApiVersion,
      client_id: props.clientId,
      user_id: props.userId,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      auto_save_delay: props.auto_save_delay,
      theme: props.theme,
      studies_overrides: props.studies_overrides,
      drawings_access: props.drawings_access,
      disabled_features: props.disabled_features,
      enabled_features: props.enabled_features,
      favorites: props.favorites,
      overrides: overrides,
      custom_css_url: "../chart_theme.css",
    };
    tvWidget = new widget(widgetOptions);
  }, [props.reloadChart]);

  // 심볼 변경
  useEffect(() => {
    if (!tvWidget) return;

    tvWidget.onChartReady(() => {
      if (props.symbol) {
        tvWidget.activeChart().setSymbol(props.symbol);
        // chart load event
        if (!isLoadStudy) {
          loadChart();
          setIsLoadStudy(true);
        }
      }
    });
  }, [props.symbol, loadChart]);

  // 테마 변경
  useEffect(() => {
    if (!tvWidget) return;
    tvWidget.onChartReady(() => {
      if (props.theme) {
        tvWidget.changeTheme(props.theme).then(() => {
          tvWidget.activeChart().applyOverrides(overrides);
        });
      }
    });
  }, [props.theme]);

  // 차트 로딩
  useEffect(() => {
    if (!tvWidget) return;
    tvWidget.onChartReady(() => {
      setIsLoading(false);
    });
  }, []);

  // 마운트시 실행
  useEffect(() => {
    if (!tvWidget) return;
    tvWidget.onChartReady(() => {
      // chart auto save
      tvWidget.subscribe("onAutoSaveNeeded", () => {
        saveChart();
      });
      // chart wheel event
      tvWidget
        .activeChart()
        .getTimeScale()
        .barSpacingChanged()
        .subscribe(null, () => {
          saveChart();
        });
      // chart drag event
      tvWidget
        .activeChart()
        .getTimeScale()
        .rightOffsetChanged()
        .subscribe(null, () => {
          saveChart();
        });

      setView();
      setIsLoading(false);
    });
  }, []);

  // 차트 저장
  const saveChart = () => {
    tvWidget.save((data) => {
      localStorage.setItem("tradingviewStudyTemplate", JSON.stringify(data));
    });
  };

  // 차트 로드
  const loadChart = () => {
    let savedTemplate = JSON.parse(
      localStorage.getItem("tradingviewStudyTemplate")
    );
    if (savedTemplate) {
      savedTemplate.charts[0].panes[0].sources[0].state.symbol = props.symbol;
      savedTemplate.charts[0].panes[0].sources[0].state.shortName =
        props.symbol;
      tvWidget.load(savedTemplate);
    }
  };

  // view 설정
  const setView = () => {
    tvWidget
      .activeChart()
      .onDataLoaded()
      .subscribe(
        null,
        () => {
          tvWidget.activeChart().getTimeScale()._timeScale._rightOffset = 5;
        },
        true
      );
  };

  return (
    <Wrapper>
      {isLoading && <Loading></Loading>}
      <ChartContainer
        ref={ref}
        display={isLoading ? "none" : "block"}
      ></ChartContainer>
    </Wrapper>
  );
}

export default React.memo(Tvchart);

Tvchart.defaultProps = {
  symbol: "BTCKRW",
  interval: interval,
  datafeedUrl: process.env.NEXT_PUBLIC_CHART_URL,
  libraryPath: "/static/charting_library/",
  chartsStorageUrl: "https://saveload.tradingview.com",
  chartsStorageApiVersion: "1.1",
  clientId: "coin.gg",
  userId: "public_user_id",
  timezone: "Asia/Seoul",
  fullscreen: false,
  autosize: true,
  auto_save_delay: 1,
  studies_overrides: {
    "volume.volume.color.0": "#88b0e1",
    "volume.volume.color.1": "#e3a498",
  },
  drawings_access: { type: "black", tools: [{ name: "Regression Trend" }] },
  disabled_features: [
    "header_symbol_search", // 헤더 심볼검색 표시
    "header_screenshot", // 헤더 스크린샷 표시
    "header_saveload", // 헤더 저장 표시
    "countdown", // 가격선 카운트다운 표시
    "volume_force_overlay", // 캔들과 거래량 같은화면에 표시
    "go_to_date", // 특정 날짜로 이동 기능 표시
    "header_compare", // 비교 버튼 표시
  ],
  enabled_features: [
    "charting_library_debug_mode", // 차트 라이브러리 디버그 모드
  ],
  favorites: {
    intervals: ["1", "5", "15", "30", "60", "1D"],
  },
  time_frames: [
    { text: "30D", resolution: "30D", description: "30날" },
    { text: "5D", resolution: "5D", description: "5날" },
    { text: "1D", resolution: "1D", description: "1날" },
  ],
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 99%;
  z-index: 11113;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => props.display};
`;
