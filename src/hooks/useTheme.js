import { useState, useEffect } from "react";
import { themes } from "../utils/themeConfig";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("movieAppTheme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("movieAppTheme", theme);
  };

  return { theme: themes[currentTheme], changeTheme };
};