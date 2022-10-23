import historyProvider from "./historyProvider";
import stream from "./stream";

const supportedResolutions = ["1", "5", "15", "30", "60", "1D", "1W", "1M"];

const config = {
  supported_resolutions: supportedResolutions,
};

const methods = {
  // Datafeed 구성옵션 제공
  onReady: (callback) => {
    setTimeout(() => callback(config), 0);
  },

  // 사용자의 검색어와 일치하는 기호 목록을 제공
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
  // SymbolInfo 반환
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
  ) => {
    const symbol_stub = {
      name: symbolName,
      ticker: symbolName,
      description: symbolName,
      type: "crypto",
      session: "24x7", // 거래시간
      exchange: "Cashierest",
      timezone: "Asia/Seoul",
      minmov: 1, // 1틱에 대한 가격 정밀도
      pricescale: 100, // 가격 소수점 이하 자리수
      has_intraday: true, // 분단위 데이터 포함 여부
      supported_resolution: supportedResolutions,
      intraday_multipliers: ["1", "60"],
      has_empty_bars: false, // 데이터 없을 시 빈 막대 생성
      volume_precision: 2, // 볼륨 소수점 이하 자리수
      data_status: "streaming",
    };
    setTimeout(() => {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  },

  // API를 호출하여 차트데이터를 받아 차트 생성
  getBars: (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    historyProvider.getBars(
      symbolInfo,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback
    );
  },

  // 심볼에 대한 실시간 업데이트
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    stream.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    );
  },

  // 심볼에 대한 실시간 업데이트 해제
  unsubscribeBars: (subscriberUID) => {
    stream.unsubscribeBars(subscriberUID);
  },

  // 막대 범위에 대한 표시 반환
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {},

  // 시간 척도 표시
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {},

  // 서버시간 호출 (가격 눔금에 countdown 표시에 사용)
  getServerTime: (callback) => {},

  // 볼륨 프로파일 가시 범위 표시기를 계산
  getVolumeProfileResolutionForPeriod: (
    currentResolution,
    from,
    to,
    symbolInfo
  ) => {},
};

export default methods;
