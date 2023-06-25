"use client";
import React from "react";
import { BoardIcon } from "./BoardIcon";
import { useStore } from "@/lib/store";

export const CreateNewBoardButton = () => {
  const setBoardModal = useStore((state) => state.setBoardModal);
  return (
    <button
      className="pl-8 py-4 w-[17.25rem] flex items-center gap-4 shrink-0 grow-0 font-bold text-purple hover:pointer"
      onClick={() => setBoardModal({ visible: true, boardData: undefined })}
    >
      <BoardIcon color="#635FC7" />+ Create New Board
    </button>
  );
};
