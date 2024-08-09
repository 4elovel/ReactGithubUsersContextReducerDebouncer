import { createContext, useContext } from "react";

export const ThemeContext = createContext<"white" | "black" | undefined>(
  undefined
);

export function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useThemeContext must be wrapped with DashboadrdContext");
  }

  return theme;
}
