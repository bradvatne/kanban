"use client";
import { AddColumn } from "@/components/AddColumn";
import Column from "@/components/Column";
import { useStore } from "@/lib/store";
import React from "react";

export const Right = () => {
  const [currentBoard, columns] = useStore((state) => [
    state.currentBoard,
    state.columns,
  ]);

  return (
    <div className="bg-lightgrey w-full h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6 dark:bg-verydarkgrey dark:outline-darklines ">
      {columns &&
        Object.values(columns)
          .filter((column) => column.boardId === currentBoard)
          .map((column) => <Column id={column.id} key={column.id} />)}
      <AddColumn />
    </div>
  );
};
