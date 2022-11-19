import Head from "next/head";
import React from "react";

function HeadComponent(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
    </Head>
  );
}

export default HeadComponent;

HeadComponent.defaultProps = {
  title: "coin.gg",
  description: "가상 자산들의 실시간 정보를 볼 수 있는 coin.gg입니다.",
};
