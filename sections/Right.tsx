"use client";
import { AddColumn } from "@/components/AddColumn";
import Column from "@/components/Column";
import { useStore } from "@/lib/store";
import { BoardRow } from "@/types/supabase";
import React from "react";

export const Right = ({ currentBoard }: { currentBoard: BoardRow }) => {
  return (
    <div className="bg-lightgrey w-full h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6 dark:bg-verydarkgrey dark:outline-darklines ">
      {currentBoard &&
        currentBoard.Columns &&
        currentBoard?.Columns.map((column) => (
          <Column column={column} key={column.id} />
        ))}
      <AddColumn />
    </div>
  );
};
