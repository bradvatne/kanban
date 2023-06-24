"use client";
import { useLayoutStore } from "@/lib/store";
import React from "react";

export const CurrentBoard = () => {
  const currentBoard = useLayoutStore((state) => state.currentBoard);
  return <div className="text-2xl font-bold">{currentBoard}</div>;
};
