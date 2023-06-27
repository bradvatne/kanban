"use client";
import { TaskRow } from "@/types/supabase";
import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { TaskModal } from "./TaskModal";

export const Task = ({
  task,
  setTaskModal,
}: {
  task: TaskRow;
  setTaskModal: Function;
}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  return (
    <div
      className="bg-white px-4 py-6 shrink-0  rounded-lg shadow-custom hover:cursor-pointer dark:bg-darkgrey"
      onClick={() => setShowTaskModal(true)}
    >
      {showTaskModal && <TaskModal task={task} />}
      <div className="text-black font-bold text-custom dark:text-white">
        {task.title}
      </div>
      <div className="text-xs text-mediumgrey mt-2 font-bold">
        {task.subtask?.filter((subtask) => subtask?.complete === true).length ??
          0}{" "}
        out of {task.subtask?.length ?? 0} subtasks
      </div>
    </div>
  );
};
