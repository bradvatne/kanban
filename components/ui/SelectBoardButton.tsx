"use client";
import { BoardRow } from "@/types/supabase";
import React, { useState, useEffect } from "react";
import { BoardIcon } from "./BoardIcon";
import { useLayoutStore } from "@/lib/store";

export const SelectBoardButton = ({ board }: { board: BoardRow }) => {
  const currentBoard = useLayoutStore((state) => state.currentBoard);
  const setCurrentBoard = useLayoutStore((state) => state.setCurrentBoard);
  const [active, setActive] = useState(false);
  const style =
    "pl-8 py-4 w-[17.25rem] flex items-center gap-4 shrink-0 grow-0 font-bold text-mediumgrey hover:pointer";
  const activeStyle =
    "pl-8 py-4 w-[17.25rem] flex items-center gap-4 shrink-0 grow-0 font-bold text-white hover:pointer bg-purple rounded-r-full";

  useEffect(() => {
    if (currentBoard === board.title) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [currentBoard, active]);

  return (
    <button
      className={active ? activeStyle : style}
      onClick={() => setCurrentBoard(board)}
    >
      <BoardIcon color={active ? "white" : "#828FA3"} />
      {board.title}
    </button>
  );
};
