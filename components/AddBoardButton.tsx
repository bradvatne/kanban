"use client";
import React from "react";
import { BoardIcon } from "./ui/BoardIcon";
import { useStore } from "@/lib/store";
import { AddBoardModal } from "./AddBoardModal";

export const CreateNewBoardButton = () => {
  const [showBoardModal, setShowBoardModal] = useStore((state) => [
    state.showBoardModal,
    state.setShowBoardModal,
  ]);
  return (
    <>
      <button
        className="pl-8 py-4 w-[17.25rem] flex items-center gap-4 shrink-0 grow-0 font-bold text-purple hover:pointer"
        onClick={() => setShowBoardModal(true)}
      >
        <BoardIcon color="#635FC7" />+ Create New Board
      </button>
      {showBoardModal && (
        <AddBoardModal setShowBoardModal={setShowBoardModal} />
      )}
    </>
  );
};
