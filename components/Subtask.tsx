"use client";
import React from "react";
import { useStore } from "@/lib/store";

export const Subtask = ({ id }: { id: number }) => {
  const completedStyle = "text-sm text-mediumgrey font-bold line-through";
  const inProgressStyle = "text-sm text-black font-bold dark:text-white";

  const subtask = useStore((state) => state.getSubtaskById(id)(state));
  const toggleSubtaskComplete = useStore(
    (state) => state.toggleSubtaskComplete
  );

  return (
    <div
      className="rounded bg-lightgrey flex gap-4 mb-2 p-3 hover:bg-purplehover dark:bg-verydarkgrey dark:hover:bg-purplehover dark:hover:bg-opacity-25"
      onClick={(e) => {
        toggleSubtaskComplete(subtask.id);
      }}
    >
      <input
        type="checkbox"
        className="text-purple"
        checked={subtask.complete}
        onChange={() => {}}
      />
      <span className={subtask.complete ? completedStyle : inProgressStyle}>
        {subtask?.title}
      </span>
    </div>
  );
};
