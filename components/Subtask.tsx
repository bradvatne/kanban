"use client";
import { SubtaskRow } from "@/types/supabase";
import React, { useEffect, useState } from "react";
import { State, useStore } from "@/lib/store";

export const Subtask = ({ subtask }: { subtask: SubtaskRow }) => {
  const completedStyle = "text-sm text-mediumgrey font-bold line-through";
  const inProgressStyle = "text-sm text-black font-bold";
  const toggleSubtaskStatus = useStore((state) => state.toggleSubtaskStatus);

  const getSubtaskStatus = (state: State, subtaskId: number) =>
    state.boards
      .flatMap((board) => board.Columns)
      .flatMap((column) => column.task)
      .flatMap((task) => task.subtask)
      .find((subtask) => subtask.id === subtaskId)?.complete;

  const isChecked = useStore((state) => getSubtaskStatus(state, subtask.id));

  return (
    <div
      className="rounded bg-lightgrey flex gap-4 mb-2 p-3"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        className="accent-purple"
        defaultChecked={subtask?.complete}
        onClick={() => {
          toggleSubtaskStatus(subtask.id);
        }}
      />
      <span className={isChecked ? completedStyle : inProgressStyle}>
        {subtask?.title}
      </span>
    </div>
  );
};
