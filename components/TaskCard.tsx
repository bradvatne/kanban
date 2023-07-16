"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { TaskModal } from "./TaskModal";
import { Subtask } from "@/types/types";

export const TaskCard = ({ id }: { id: number }) => {
  const [
    showViewTaskModal,
    setShowViewTaskModal,
    closeModals,
    currentTask,
    setCurrentTask,
  ] = useStore((state) => [
    state.showViewTaskModal,
    state.setShowViewTaskModal,
    state.closeModals,
    state.currentTask,
    state.setCurrentTask,
  ]);
  const task = useStore((state) => state.getTaskById(id)(state));
  const subtasks = useStore((state) =>
    Object.values(state.subtasks).filter((subtasks) => subtasks.taskid === id)
  );

  return (
    <>
      <div
        className="bg-white px-4 py-6 shrink-0 rounded-lg shadow-custom hover:cursor-pointer dark:bg-darkgrey "
        onClick={() => {
          setCurrentTask(id);
          setShowViewTaskModal(true);
        }}
      >
        <div className="text-black font-bold text-custom dark:text-white">
          {task?.title}
        </div>
        <div className="text-xs text-mediumgrey mt-2 font-bold">
          {subtasks.filter((subtask: Subtask) => subtask.complete).length} out
          of {subtasks.length} subtasks.
        </div>
      </div>
    </>
  );
};
