import { ReactElement, useEffect } from "react";
import { useThemeContext } from "./context";

interface Props {
  children: ReactElement<Props>;
}

const ThemeHandler = ({ children }: Props) => {
  const theme = useThemeContext();

  useEffect(() => {
    document.body.setAttribute(
      "style",
      "color:" +
        (theme === "white" ? "black" : "white") +
        ";background-color:" +
        theme
    );
  }, [theme]);

  return <>{children}</>;
};

export default ThemeHandler;
