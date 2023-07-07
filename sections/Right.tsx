"use client";
import { AddColumn } from "@/components/AddColumn";
import Column from "@/components/Column";
import { EditBoard } from "@/components/EditBoard";
import { useStore } from "@/lib/store";
import React, { useState } from "react";

export const Right = () => {
  const columns = useStore((state) =>
    Object.values(state.columns).filter(
      (column) => column.boardid === state.currentBoard
    )
  );
  const board = useStore((state) =>
    state.getBoardById(state.currentBoard!)(state)
  );
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);

  return showEditBoardModal ? (
    <EditBoard board={board} setShowBoardModal={setShowEditBoardModal} />
  ) : (
    <div className="bg-lightgrey h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6 dark:bg-verydarkgrey dark:outline-darklines shrink-0 width-calc flex-grow">
      {columns &&
        columns.map((column) => <Column id={column.id} key={column.id} />)}
      {columns.length > 0 ? (
        <AddColumn />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-mediumgrey flex-col">
          <p className="pb-8">
            This board is empty. Create a new column to get started
          </p>
          <button
            onClick={() => setShowEditBoardModal(true)}
            className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold px-[1.5rem] py-3"
          >
            + Add New Column
          </button>
        </div>
      )}
    </div>
  );
};
