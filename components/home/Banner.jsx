import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect } from "react";
import Carousel from "@/components/common/Carousel";
import chart from "@/images/chart.svg";
import fingerprint from "@/images/fingerprint.svg";
import news from "@/images/news.svg";
import password from "@/images/password.svg";
import phishing from "@/images/phishing.svg";

const Banner = () => {
  return (
    <Wrapper>
      <Carousel
        loop={true}
        loopAdditionalSlides={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <BannerBox backgroundColor="var(--blue900)">
          <Content>
            <TextBox>
              <Title>트레이딩뷰 차트</Title>
              <Description>트레이딩뷰 실시간 차트로</Description>
              <Description>가상자산의 시세를 확인하세요.</Description>
            </TextBox>
            <ImageBox>
              <Image src={chart} alt="chart" width={192} height={192}></Image>
            </ImageBox>
          </Content>
        </BannerBox>
        <BannerBox backgroundColor="var(--blue400)">
          <Content>
            <TextBox>
              <Title>생체인증 로그인</Title>
              <Description>생체인증으로 빠르게 로그인하세요.</Description>
            </TextBox>
            <ImageBox>
              <Image
                src={fingerprint}
                alt="fingerprint"
                width={192}
                height={192}
              ></Image>
            </ImageBox>
          </Content>
        </BannerBox>
        <BannerBox backgroundColor="var(--blue800)">
          <Content>
            <TextBox>
              <Title>인증 서비스</Title>
              <Description>OTP를 발급받아 계정보안을 강화하세요.</Description>
            </TextBox>
            <ImageBox>
              <Image
                src={password}
                alt="password"
                width={192}
                height={192}
              ></Image>
            </ImageBox>
          </Content>
        </BannerBox>
        <BannerBox backgroundColor="var(--blue700)">
          <Content>
            <TextBox>
              <Title>피싱 메일 조심</Title>
              <Description>COIN.GG에서는 어떠한 경우에도 고객님의</Description>
              <Description>
                개인정보를 메일을 통해서 요구하지 않습니다.
              </Description>
            </TextBox>
            <ImageBox>
              <Image
                src={phishing}
                alt="phishing"
                width={192}
                height={192}
              ></Image>
            </ImageBox>
          </Content>
        </BannerBox>
        <BannerBox backgroundColor="var(--blue500)">
          <Content>
            <TextBox>
              <Title>암호화폐 뉴스 서비스</Title>
              <Description>
                빠르고 정확한 가상자산 소식을 확인하세요.
              </Description>
            </TextBox>
            <ImageBox>
              <Image src={news} alt="news" width={192} height={192}></Image>
            </ImageBox>
          </Content>
        </BannerBox>
      </Carousel>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div``;

const BannerBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 256px;
  background-color: ${(props) => props.backgroundColor};
  & * {
    background-color: inherit;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;
const Title = styled.strong`
  font: var(--headline32);
  color: white;
  margin-bottom: 24px;
`;
const Description = styled.p`
  font: var(--body16);
  color: white;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
