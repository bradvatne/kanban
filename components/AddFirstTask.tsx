"use client";
import React from "react";
import { useStore } from "@/lib/store";

export const AddFirstTask = () => {
  const [setShowAddTaskModal] = useStore((state) => [
    state.setShowAddTaskModal,
  ]);
  return (
    <>
      <div
        className="border-dotted border-4 rounded-xl light:border-mediumgrey dark:border-darkgrey p-4 text-mediumgrey font-bold hover:cursor-pointer"
        onClick={() => setShowAddTaskModal(true)}
      >
        + Add a new task
      </div>
    </>
  );
};
