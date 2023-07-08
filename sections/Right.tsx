"use client";
import { AddBoardModal } from "@/components/AddBoardModal";
import { AddColumn } from "@/components/AddColumn";
import { Columns } from "@/components/Columns";
import { EditBoard } from "@/components/EditBoard";
import { EmptyBoard } from "@/components/EmptyBoard";
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
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);

  return showEditBoardModal ? (
    <EditBoard />
  ) : showAddBoardModal ? (
    <AddBoardModal />
  ) : (
    <div className="bg-lightgrey h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6 dark:bg-verydarkgrey dark:outline-darklines shrink-0 width-calc flex-grow">
      {columns && columns.length > 0 ? (
        <>
          <Columns columns={columns} />
          <AddColumn />
        </>
      ) : (
        <EmptyBoard
          setShowEditBoardModal={
            showEditBoardModal ? setShowEditBoardModal : setShowAddBoardModal
          }
        />
      )}
    </div>
  );
};
