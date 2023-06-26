"use client";
import Column from "@/components/Column";
import { useStore } from "@/lib/store";
import React from "react";

export const Right = () => {
  const currentBoard = useStore((state) => state.currentBoard);
  const columns = currentBoard?.Columns;

  return (
    <div className="bg-lightgrey w-full h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6 dark:bg-verydarkgrey dark:outline-darklines">
      {columns &&
        columns.map((column) => <Column column={column} key={column.id} />)}
    </div>
  );
};
