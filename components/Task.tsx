"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { TaskModal } from "./TaskModal";
import { Subtask } from "@/types/types";

export const Task = ({ id }: { id: number }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const task = useStore((state) => state.getTaskById(id)(state));
  const subtasks = useStore((state) =>
    Object.values(state.subtasks).filter((subtasks) => subtasks.taskid === id)
  );

  return (
    <div
      className="bg-white px-4 py-6 shrink-0  rounded-lg shadow-custom hover:cursor-pointer dark:bg-darkgrey"
      onClick={() => setShowTaskModal(true)}
    >
      {showTaskModal && (
        <TaskModal id={id} setShowTaskModal={setShowTaskModal} />
      )}
      <div className="text-black font-bold text-custom dark:text-white">
        {task?.title}
      </div>
      <div className="text-xs text-mediumgrey mt-2 font-bold">
        {subtasks.filter((subtask: Subtask) => subtask.complete).length} out of{" "}
        {subtasks.length} subtasks.
      </div>
    </div>
  );
};
