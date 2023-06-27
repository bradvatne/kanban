"use client";
import { TaskRow } from "@/types/supabase";
import React from "react";
import { useStore } from "@/lib/store";

export const Task = ({
  task,
  setTaskModal,
}: {
  task: TaskRow;
  setTaskModal: Function;
}) => {
  return (
    <div
      className="bg-white px-4 py-6 shrink-0  rounded-lg shadow-custom hover:cursor-pointer dark:bg-darkgrey"
      onClick={() =>
        setTaskModal({ taskData: task, type: "VIEW", visible: true })
      }
    >
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
