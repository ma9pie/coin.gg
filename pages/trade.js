import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Chart from "@/components/trade/Chart";

function Trade() {
  return (
    <Wrapper>
      <ChartWrapper>
        <Chart></Chart>
      </ChartWrapper>
    </Wrapper>
  );
}

export default Trade;

const Wrapper = styled.div`
  height: 100vh;
`;

const ChartWrapper = styled.div`
  width: 600px;
  height: 400px;
`;
