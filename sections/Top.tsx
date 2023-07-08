"use client";
import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { AddTaskButton } from "@/components/AddTaskButton";
import { EditBoard } from "@/components/EditBoard";
import { useStore } from "@/lib/store";
import { ConfirmDeleteBoard } from "@/components/ConfirmDeleteBoard";
import { CurrentBoardTitle } from "@/components/CurrentBoardTitle";
import { Icons } from "@/components/ui/Icons";

const Top = () => {
  const [showEditBoardMenu, setShowEditBoardMenu] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useStore((state) => [
    state.showEditBoardModal,
    state.setShowEditBoardModal,
  ]);
  const board = useStore((state) =>
    state.getBoardById(state.currentBoard!)(state)
  );
  const boardIsEmpty = useStore(
    (state) =>
      Object.values(state.columns).filter(
        (column) => column.boardid === board?.id
      ).length < 1
  );
  const startEditBoard = () => {
    setShowEditBoardMenu(false);
    setShowEditBoardModal(true);
  };

  return (
    <div className="flex h-[6rem] w-full">
      <div className="pl-8 pt-8 w-[300px] border-r border-lightlines dark:border-darklines shrink-0 dark:bg-darkgrey hidden md:block">
        <Logo />
      </div>
      <div className="flex items-center justify-between w-full px-6 dark:bg-darkgrey">
        <CurrentBoardTitle />
        <div className="flex gap-[1.5rem] items-center">
          <AddTaskButton boardIsEmpty={boardIsEmpty} />
          <div onClick={() => setShowEditBoardMenu(!showEditBoardMenu)}>
            <Icons.threeDot />
          </div>
          {showEditBoardMenu && (
            <div className="absolute flex p-4 flex-col gap-4 rounded-lg bg-white w-[12rem] right-[1rem] top-[5.6rem] shadow-xl dark:bg-verydarkgrey ">
              <button
                className="text-mediumgrey text-custom text-left"
                onClick={() => startEditBoard()}
              >
                Edit Board
              </button>
              <button
                className="text-red text-left"
                onClick={() => setShowDeleteBoardModal(true)}
              >
                Delete Board
              </button>
            </div>
          )}
        </div>
      </div>
      {showDeleteBoardModal ? (
        <ConfirmDeleteBoard
          board={board}
          setShowDeleteBoardModal={setShowDeleteBoardModal}
          setShowMiniMenu={setShowEditBoardMenu}
        />
      ) : (
        showEditBoardModal && (
          <EditBoard setShowMiniMenu={setShowEditBoardMenu} />
        )
      )}
    </div>
  );
};

export default Top;
