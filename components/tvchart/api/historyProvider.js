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
    const { from, to, countback } = periodParams;

    const result = await Api.get(
      "https://crix-api-tv.upbit.com/v1/crix/tradingview/history",
      {
        params: {
          symbol: symbolInfo.name,
          resolution: resolution,
          from: from,
          to: to,
          countback: countback,
        },
      }
    )
      .then((res) => {
        // 테스트용 콘솔
        // const start = new Date(from * 1000);
        // const end = new Date(to * 1000);
        // console.log(
        //   `${start.toLocaleString()} (${from}) ~ ${end.toLocaleString()} (${to})`
        // );

        const { data } = res;

        let bars = [];
        data.t?.map((item, i) => {
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
