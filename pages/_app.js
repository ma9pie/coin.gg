import "@/styles/styles.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps}></Component>);
}

export default App;
