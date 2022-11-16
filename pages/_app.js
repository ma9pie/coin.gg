import "@/styles/styles.scss";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps}></Component>);
}

export default App;
