import "@/styles/styles.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps}></Component>);
}

export default appWithTranslation(App);
