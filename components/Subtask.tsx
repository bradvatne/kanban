"use client";
import { SubtaskRow } from "@/types/supabase";
import React from "react";
import { useStore } from "@/lib/store";

export const Subtask = ({
  subtask,
  complete,
}: {
  subtask: SubtaskRow;
  complete: boolean;
}) => {
  const completedStyle = "text-sm text-mediumgrey font-bold line-through";
  const inProgressStyle = "text-sm text-black font-bold";
  const toggleSubtaskStatus = useStore((state) => state.toggleSubtaskStatus);
  const task = subtask.taskid;
  const board = useStore((state) => state.currentBoard);
  board?.Columns.find((x) => x.task.find((x) => x.id));

  return (
    <div
      className="rounded bg-lightgrey flex gap-4 mb-2 p-3"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        className="accent-purple"
        defaultChecked={subtask.complete}
        onClick={() => {
          toggleSubtaskStatus(subtask.id);
        }}
      />
      <span className={complete ? completedStyle : inProgressStyle}>
        {subtask.title}
      </span>
    </div>
  );
};
