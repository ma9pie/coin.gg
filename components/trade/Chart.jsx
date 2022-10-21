import React from "react";
import dynamic from "next/dynamic";

const Tvchart = dynamic(() => import("@/components/tvchart"), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
});

function Chart({ symbol, theme }) {
  return (
    <div style={{ width: "900px", height: "600px", margin: "50px" }}>
      <Tvchart symbol={symbol} theme={theme}></Tvchart>
    </div>
  );
}
export default React.memo(Chart);
