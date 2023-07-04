"use client";
import { useStore } from "@/lib/store";
import React, { useEffect } from "react";

export const CurrentBoard = () => {
  const currentBoard = useStore((state) => state.currentBoard);
  const board = useStore((state) =>
    Object.values(state.boards).find((board) => board.id === currentBoard)
  );

  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);
  return <div className="text-2xl font-bold">{board?.title}</div>;
};
