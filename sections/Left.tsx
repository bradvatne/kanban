"use client";
import { HideSidebarButton } from "@/components/HideSidebarButton";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { CreateNewBoardButton } from "@/components/ui/CreateNewBoardButton";
import { EyeIcon } from "@/components/ui/EyeIcon";
import { OpenEyeIcon } from "@/components/ui/OpenEyeIcon";
import { SelectBoardButton } from "@/components/ui/SelectBoardButton";
import { useStore } from "@/lib/store";
import { BoardRow, Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

export const Left = ({ boards }: { boards: BoardRow[] }) => {
  const isLeftDrawerVisible = useStore((state) => state.isLeftDrawerVisible);
  return isLeftDrawerVisible ? (
    <div className="w-[300px] shrink-0 flex flex-col justify-between h-full dark:bg-darkgrey">
      <div>
        <div
          className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4"
          onClick={() => console.log(boards)}
        >
          All Boards ({boards.length})
        </div>
        <div className="pt-[1.2rem]">
          {boards &&
            boards.length > 0 &&
            boards.map((board) => (
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
    <OpenEyeIcon />
  );
};
