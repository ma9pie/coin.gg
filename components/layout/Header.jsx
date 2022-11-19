import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "@/components/common/Theme";
import brandLogo from "@/images/brandLogo.svg";

const Header = () => {
  return (
    <Wrapper>
      <Link href="/">
        <a>
          <LogoContainer>
            <Image src={brandLogo} alt="logo" width={30} height={30}></Image>
            <LogoText>KIM JUN YOUNG</LogoText>
          </LogoContainer>
        </a>
      </Link>

      <GnbContainer>
        <Link href="/about">
          <a>
            <LinkBox>About</LinkBox>
          </a>
        </Link>
        <Link href="/skills">
          <a>
            <LinkBox>Skills</LinkBox>
          </a>
        </Link>
        <Link href="/projects">
          <a>
            <LinkBox>Projects</LinkBox>
          </a>
        </Link>
        <Link href="/resume">
          <a>
            <LinkBox>Resume</LinkBox>
          </a>
        </Link>
      </GnbContainer>
      <Theme></Theme>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 360px;
  height: 60px;
  padding: 0px 20px;
`;
const GnbContainer = styled.nav`
  display: flex;
  align-items: center;
`;
const LinkBox = styled.div`
  padding: 0px 4px;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LogoText = styled.h1`
  font-size: 16px;
  margin-left: 4px;
`;
