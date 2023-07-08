"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Icons } from "./ui/Icons";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="mb-[1.38rem] bg-lightgrey h-12 w-[16rem] ml-5 rounded-md flex items-center justify-center gap-6 dark:bg-verydarkgrey"
    >
      <Icons.sun />
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <div className="w-9 h-5 bg-purple peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purplehover dark:peer-focus:ring-purplehover rounded-full peer dark:bg-purple peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-purple"></div>
      </label>
      <Icons.moon />
    </button>
  );
};

export default ToggleThemeButton;
