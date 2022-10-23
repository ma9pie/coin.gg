import Api from "@/api/index";

const history = {};

const methods = {
  history: history,

  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const result = await Api.get(
      "https://crix-api-tv.upbit.com/v1/crix/tradingview/history",
      {
        params: {
          symbol: symbolInfo.name,
          resolution: resolution,
          from: periodParams.from,
          to: periodParams.to,
          countback: periodParams.countback,
        },
      }
    )
      .then((res) => {
        const { data } = res;

        let bars = [];
        data.t.map((item, i) => {
          bars.push({
            time: item,
            open: data.o[i],
            high: data.h[i],
            low: data.l[i],
            close: data.c[i],
            volume: data.v[i],
          });
        });

        if (bars.length === 0) {
          onHistoryCallback([], { noData: true });
        } else {
          onHistoryCallback(bars, { noData: false });
        }
      })
      .catch((err) => {
        console.log({ err });
        return [];
      });
    return result;
  },
};

export default methods;
