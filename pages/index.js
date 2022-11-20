import styled from "@emotion/styled";
import React from "react";
import CommonLayout from "@/layouts/CommonLayout";

export default function Home() {
  return <Wrapper>index</Wrapper>;
}

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
