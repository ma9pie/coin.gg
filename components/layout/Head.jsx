import Head from "next/head";
import React from "react";

function HeadComponent(props) {
  return (
    <Head>
      <title>Front-End Developer 김준영</title>
      <meta
        name="description"
        content="항상 성장하는 프론트엔드 개발자 김준영이라고 합니다."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadComponent;

HeadComponent.defaultProps = {
  title: "캐셔레스트 - 가상자산 거래소의 새로운 기준",
};
