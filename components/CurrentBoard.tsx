"use client";
import { useStore } from "@/lib/store";
import React from "react";

export const CurrentBoard = () => {
  const currentBoard = useStore((state) => state.currentBoard);
  return <div className="text-2xl font-bold">{currentBoard?.title}</div>;
};
