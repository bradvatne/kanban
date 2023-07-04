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

  const filteredColumns = Object.values(columns).filter(
    (column) => column.boardId === currentBoard
  );
  return (
    <div className="bg-lightgrey w-full h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6 dark:bg-verydarkgrey dark:outline-darklines ">
      {columns &&
        filteredColumns.map((column) => (
          <Column id={column.id} key={column.id} />
        ))}
      {filteredColumns.length > 0 ? (
        <AddColumn />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-mediumgrey flex-col">
          <p className="pb-8">
            This board is empty. Create a new column to get started
          </p>
          <button className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold px-[1.5rem] py-3">
            + Add New Column
          </button>
        </div>
      )}
    </div>
  );
};
