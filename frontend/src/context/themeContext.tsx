// ThemeContext.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [theme, setTheme] =
    useState<Theme>("light");

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme") as Theme;

    if (savedTheme) {
      setTheme(savedTheme);
    }

  }, []);

  useEffect(() => {

    if (theme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);