"use client";
import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { TaskModal } from "./TaskModal";
import { SubtaskRow, TaskRow } from "@/types/supabase";

export const Task = ({ task }: { task: TaskRow }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  return (
    <div
      className="bg-white px-4 py-6 shrink-0  rounded-lg shadow-custom hover:cursor-pointer dark:bg-darkgrey"
      onClick={() => setShowTaskModal(true)}
    >
      {showTaskModal && (
        <TaskModal task={task!} setShowTaskModal={setShowTaskModal} />
      )}
      <div className="text-black font-bold text-custom dark:text-white">
        {task?.title}
      </div>
      <div className="text-xs text-mediumgrey mt-2 font-bold">
        {task.subtask?.filter(
          (subtask: SubtaskRow) => subtask?.complete === false
        ).length ?? 0}{" "}
        out of {task?.subtask?.length ?? 0} subtasks
      </div>
    </div>
  );
};
