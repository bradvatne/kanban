"use client";
import { ThemeProvider } from "next-themes";
import React, { ReactNode, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BoardRow, Database } from "@/types/supabase";
import { useLayoutStore } from "@/lib/store";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
