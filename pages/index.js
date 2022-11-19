import styled from "@emotion/styled";
import React from "react";
import CommonLayout from "@/layouts/CommonLayout";

export default function Home() {
  return (
    <div>
      <div>Home Page2</div>
      <div>{process.env.NEXT_PUBLIC_MODE}</div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div``;
