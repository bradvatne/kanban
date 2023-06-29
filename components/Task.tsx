"use client";
import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { TaskModal } from "./TaskModal";
import { SubtaskRow } from "@/types/supabase";

export const Task = ({ taskId }: { taskId: number }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const state = useStore.getState(); // Access the Zustand store state

  // Use Array.prototype.flatMap and Array.prototype.find to flatten the nested structure and find the task by ID
  const [task] = state.boards.flatMap((board) =>
    board.Columns.flatMap((column) =>
      column.task.find((task) => task.id === taskId)
    )
  );

  const subtasks = task?.subtask;

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
        {subtasks?.filter((subtask: SubtaskRow) => subtask?.complete === false)
          .length ?? 0}{" "}
        out of {task?.subtask?.length ?? 0} subtasks
      </div>
    </div>
  );
};
