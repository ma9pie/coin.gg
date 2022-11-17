import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React from "react";

const Tvchart = dynamic(() => import("@/components/tvchart"), {
  ssr: false,
});

function Chart(props) {
  return (
    <Wrapper>
      <Tvchart {...props}></Tvchart>
    </Wrapper>
  );
}
export default React.memo(Chart);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: "hidden";
`;
