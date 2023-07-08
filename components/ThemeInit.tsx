import React, { ReactNode, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeInit = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useTheme();
  useEffect(() => {
    console.log("hello");
    const preferredTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setTheme(preferredTheme);
  }, []);
  return <div className="h-full">{children}</div>;
};
