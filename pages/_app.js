import styled from "@emotion/styled";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import GoogleAnalyticsUtils from "@/utils/GoogleAnalyticsUtils";
import WebSocket from "@/utils/WebSocketUtils";
import Axios from "@/api/index";
import "@/styles/app.scss";

function App({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  // 소켓
  useEffect(() => {
    WebSocket.onCreate();
    WebSocket.onOpen(() => {
      WebSocket.onSend(`[
             { ticket: "UNIQUE_TICKET" },
             { type: "ticker", codes: ["KRW-ETH"] }
           ]`);
    });
    WebSocket.onMessage((res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    Axios.get("https://api.upbit.com/v1/market/all").then((res) => {
      let KRW = [];
      let BTC = [];
      let USDT = [];
      let ETC = [];
      res.data.map((item) => {
        const market = item.market.split("-")[0];
        switch (market) {
          case "KRW":
            KRW.push(item);
            break;
          case "BTC":
            BTC.push(item);
            break;
          case "USDT":
            USDT.push(item);
            break;
          default:
            ETC.push(item);
            break;
        }
      });
      console.log(KRW);
      console.log(BTC);
      console.log(USDT);
      console.log(ETC);

      console.log(
        KRW.map((item) => {
          return item.market;
        }).join("','")
      );
    });
  }, []);

  // 구글 애널리틱스 조회수 측정
  useEffect(() => {
    const handleRouteChange = (url) => {
      GoogleAnalyticsUtils.changeRouteGtag(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydrateState}>
        {getLayout(<Component {...pageProps} />)}
      </Hydrate>
      <ReactQueryDevtoolsWrapper>
        {typeof window !== "undefined" &&
          window.location.hostname === "localhost" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
      </ReactQueryDevtoolsWrapper>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);

const ReactQueryDevtoolsWrapper = styled.div`
  background-color: black !important;
  color: white !important;
  & * {
    background-color: inherit;
    color: inherit;
  }
`;
