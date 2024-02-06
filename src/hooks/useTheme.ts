import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return {
    theme,
    handleThemeSwitch,
  };
};
