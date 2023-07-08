"use client";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";
import { ThemeInit } from "./ThemeInit";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <ThemeInit>{children}</ThemeInit>
    </ThemeProvider>
  );
};
