"use client";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";


export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <div className="h-full">{children}</div>
    </ThemeProvider>
  );
};
