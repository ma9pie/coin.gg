import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GoogleAnalyticsUtils from "@/utils/GoogleAnalyticsUtils";
import "@/styles/styles.scss";

function App({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

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

  return getLayout(<Component {...pageProps}></Component>);
}

export default appWithTranslation(App);
