"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { Board } from "@/types/types";
import { Icons } from "./Icons";

export const SelectBoardButton = ({ board }: { board: Board }) => {
  const currentBoard = useStore((state) => state.currentBoard);
  const setCurrentBoard = useStore((state) => state.setCurrentBoard);
  const boardIsActive = currentBoard === board.id;
  const inactiveStyle =
    "pl-8 py-4 w-[17.25rem] flex items-center gap-4 shrink-0 grow-0 font-bold text-mediumgrey hover:pointer";
  const activeStyle =
    "pl-8 py-4 w-[17.25rem] flex items-center gap-4 shrink-0 grow-0 font-bold text-white hover:pointer bg-purple rounded-r-full";

  return (
    <button
      className={boardIsActive ? activeStyle : inactiveStyle}
      onClick={() => setCurrentBoard(board.id)}
    >
      <Icons.board color={boardIsActive ? "white" : "#828FA3"} />
      {board.title}
    </button>
  );
};
