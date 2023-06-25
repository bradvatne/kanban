"use client";
import React from "react";
import { useLayoutStore } from "@/lib/store";
import { TaskRow } from "@/types/supabase";

export const AddTaskButton = () => {
  const taskModal = useLayoutStore((state) => state.taskModal);
  const setTaskModal = useLayoutStore((state) => state.setTaskModal);
  return (
    <button
      className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold px-[1.5rem] py-3"
      onClick={() => setTaskModal(taskModal.taskData as TaskRow, "ADD", true)}
    >
      + Add New Task
    </button>
  );
};
