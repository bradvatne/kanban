"use client";
import { useStore } from "@/lib/store";
import React, { useState } from "react";
import { Logo } from "./ui/Logo";
import { SelectBoardButton } from "./ui/SelectBoardButton";
import { Board } from "@/types/types";
import { CreateNewBoardButton } from "./AddBoardButton";
import ToggleThemeButton from "./ToggleThemeButton";

export const CurrentBoardTitle = () => {
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const currentBoard = useStore((state) => state.currentBoard);
  const board = useStore((state) =>
    Object.values(state.boards).find((board) => board.id === currentBoard)
  );
  const boards = useStore((state) => state.boards);

  return (
    <div className="flex" onClick={() => setShowBoardMenu(false)}>
      <div className="w-[1.5rem] mr-[1.5rem] md:hidden block">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold">{board?.title}</h1>
      <button
        className="ml-[.5rem] md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          setShowBoardMenu(!showBoardMenu);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
        >
          <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
        </svg>
      </button>
      {showBoardMenu && (
        <div
          className="absolute top-24 bg-darkgrey shadow-xl rounded-xl"
          onClick={() => setShowBoardMenu(false)}
        >
          <div className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4">
            All Boards ({Object.entries(boards).length})
          </div>
          <div className="pt-[1.2rem]">
            {boards &&
              Object.values(boards).map((board: Board) => (
                <SelectBoardButton board={board} key={board.id} />
              ))}
            <CreateNewBoardButton />
          </div>
          <div className="mx-auto pr-5">
            <ToggleThemeButton />
          </div>
        </div>
      )}
    </div>
  );
};
