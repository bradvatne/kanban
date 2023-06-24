"use client";
import { ThemeProvider } from "next-themes";
import React, { ReactNode, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const Providers = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase.from("board").select(``);



  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
