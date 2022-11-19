import styled from "@emotion/styled";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import moon from "@/images/moon.svg";
import sun from "@/images/sun.svg";

const Theme = (props) => {
  const [theme, setTheme] = useState("Dark");

  // 다크 모드
  const setDark = useCallback(() => {
    setTheme("Dark");
    localStorage.setItem("theme", "Dark");
    document.documentElement.setAttribute("data-theme", "Dark");
  }, []);

  // 라이트 모드
  const setLight = useCallback(() => {
    setTheme("Light");
    localStorage.setItem("theme", "Light");
    document.documentElement.setAttribute("data-theme", "Light");
  }, []);

  // 테마 변경
  const toggleTheme = () => {
    if (theme === "Dark") {
      setLight();
    } else {
      setDark();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "Light") {
      setLight();
    } else {
      setDark();
    }
  }, [setDark, setLight]);

  return (
    <Wrapper {...props} onClick={toggleTheme}>
      {theme === "Light" && (
        <Image src={sun} alt="themeIcon" width={30} height={30}></Image>
      )}
      {theme === "Dark" && (
        <Image src={moon} alt="themeIcon" width={30} height={30}></Image>
      )}
    </Wrapper>
  );
};

export default Theme;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  cursor: pointer;
`;
