import styled from "@emotion/styled";
import React from "react";
import Banner from "@/components/home/Banner";
import MainContent from "@/components/home/MainContent";
import CommonLayout from "@/layouts/CommonLayout";

export default function Home() {
  return (
    <Wrapper>
      <MainContent></MainContent>
      <Banner></Banner>
    </Wrapper>
  );
}

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
