import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Axios from "@/api/index";

const News = () => {
  useEffect(() => {
    Axios.get("https://api.cryptohub.or.kr/api/alience/coinness").then(
      (res) => {
        console.log(res.data);
      }
    );
  }, []);
  return <Wrapper>News</Wrapper>;
};

export default News;

const Wrapper = styled.div``;
