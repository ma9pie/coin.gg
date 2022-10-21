import Rest from "@/api/Rest";

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
    const result = await Rest.get("chart/history", {
      params: {
        symbol: symbolInfo.name,
        resolution: resolution,
        from: periodParams.from,
        to: periodParams.to,
        countback: periodParams.countback,
      },
    })
      .then((res) => {
        let bars = res.data;
        if (periodParams.firstDataRequest) {
          const lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = { lastBar: lastBar };
        }

        return bars;
      })
      .catch((err) => {
        console.log({ err });
        return [];
      });
    return result;
  },
};

export default methods;
