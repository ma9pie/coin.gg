import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Loading from "@/components/common/Loading";

const Test = () => {
  return (
    <Wrapper>
      <Loading></Loading>
    </Wrapper>
  );
};
export default Test;

const Wrapper = styled.div``;
