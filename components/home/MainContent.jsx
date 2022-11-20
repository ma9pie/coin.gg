import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import worldDark from "@/images/worldDark.svg";
import worldLight from "@/images/worldLight.svg";

const MainContent = () => {
  const [theme, setTheme] = useState("Light");
  useEffect(() => {
    if (localStorage.getItem("theme") === "Dark") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  }, []);

  return (
    <Wrapper>
      {theme === "Light" ? (
        <Image src={worldLight} alt="world" width={1032} height={500}></Image>
      ) : (
        <Image src={worldDark} alt="world" width={1032} height={500}></Image>
      )}
    </Wrapper>
  );
};

export default MainContent;

const Wrapper = styled.div`
  width: 1032px;
  margin: 0px auto;
`;
