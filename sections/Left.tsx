"use client";
import { HideSidebarButton } from "@/components/HideSidebarButton";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { CreateNewBoardButton } from "@/components/AddBoardButton";
import { SelectBoardButton } from "@/components/ui/SelectBoardButton";
import { useStore } from "@/lib/store";
import { Board } from "@/types/types";
import React, { useEffect } from "react";
import { fetchData } from "@/lib/queries/fetchData";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Icons } from "@/components/ui/Icons";

export const Left = () => {
  const supabase = getSupabaseClient();
  const state = useStore();

  useEffect(() => {
    fetchData(supabase, state);
  }, [supabase]);

  return state.showLeftDrawer ? (
    <div className="w-[300px] shrink-0 md:flex flex-col justify-between h-full dark:bg-darkgrey hidden">
      <div>
        <div className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4">
          All Boards ({Object.entries(state.boards).length})
        </div>
        <div className="pt-[1.2rem]">
          {state.boards &&
            Object.values(state.boards).map((board: Board) => (
              <SelectBoardButton board={board} key={board.id} />
            ))}
          <CreateNewBoardButton />
        </div>
      </div>
      <div>
        <ToggleThemeButton />
        <HideSidebarButton />
      </div>
    </div>
  ) : (
    <Icons.openEye />
  );
};
