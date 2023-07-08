"use client";
import { useStore } from "@/lib/store";
import React, { useEffect } from "react";
import { Logo } from "./ui/Logo";

export const CurrentBoard = () => {
  const currentBoard = useStore((state) => state.currentBoard);
  const board = useStore((state) =>
    Object.values(state.boards).find((board) => board.id === currentBoard)
  );

  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);
  return (
    <div className="flex">
      <div className="w-[1.5rem] mr-[1.5rem] md:hidden block">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold">{board?.title}</h1>
      <button className="ml-[.5rem] md:hidden">
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
    </div>
  );
};
