import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "@/components/common/Theme";
import logo from "@/images/logo.svg";

const Header = () => {
  return (
    <Wrapper>
      <GnbContainer>
        <Link href="/">
          <a>
            <LogoContainer>
              <Image src={logo} alt="logo" width={30} height={30}></Image>
              <LogoText>COIN.GG</LogoText>
            </LogoContainer>
          </a>
        </Link>
        <Link href="/">
          <a>
            <LinkBox>홈</LinkBox>
          </a>
        </Link>
        <Link href="/trade">
          <a>
            <LinkBox>거래소</LinkBox>
          </a>
        </Link>
      </GnbContainer>
      <Theme></Theme>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 360px;
  height: 60px;
  padding: 0px 20px;
  background-color: var(--blue600);
  & * {
    background-color: inherit;
  }
`;
const GnbContainer = styled.nav`
  display: flex;
  align-items: center;
`;
const LinkBox = styled.div`
  padding: 0px 16px;
  color: white;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 80px;
`;
const LogoText = styled.h1`
  font-size: 16px;
  margin-left: 4px;
  color: white;
`;
