import { Html, Head, Main, NextScript } from "next/document"

function Document() {
  return (
    <Html>
      <Head>
        {/* <script defer src="/static/datafeeds/udf/dist/bundle.js" /> */}

        {/* <script
          defer
          type="text/javascript"
          src="/static/charting_library/charting_library.min.js"
        ></script> */}

        {/* <script
          defer
          type="text/javascript"
          src="/static/datafeeds/udf/dist/polyfills.js"
        ></script> */}

        <script
          defer
          type="text/javascript"
          src="/static/datafeeds/udf/dist/bundle.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
