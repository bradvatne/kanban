"use client";
import { SubtaskRow } from "@/types/supabase";
import React from "react";
import { useStore } from "@/lib/store";

export const Subtask = ({ subtaskId }: { subtaskId: number }) => {
  const completedStyle = "text-sm text-mediumgrey font-bold line-through";
  const inProgressStyle = "text-sm text-black font-bold";
  const toggleSubtaskStatus = useStore((state) => state.toggleSubtaskStatus);
  const state = useStore();

  const [subtask] = state.boards.flatMap((board) =>
    board.Columns.flatMap((column) =>
      column.task.flatMap((task) =>
        task.subtask.find((subtask) => subtask.id === subtaskId)
      )
    )
  );

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
          toggleSubtaskStatus(subtask?.id!);
        }}
      />
      <span className={subtask?.complete ? completedStyle : inProgressStyle}>
        {subtask?.title}
      </span>
    </div>
  );
};
