import { TaskRow } from "@/types/supabase";
import React from "react";
import { Subtask } from "./Subtask";

export const TaskModal = ({ task }: { task: TaskRow }) => {
  return (
    <div className="z-50 absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center top-0 left-0">
      <div className="w-[30rem] p-[2rem] bg-white rounded-md">
        <h2 className="text-xl text-black font-bold">{task.title}</h2>
        <p className="text-sm text-mediumgrey font-medium leading-6 my-[1.5rem]">
          {task.id}
        </p>
        <h3 className="text-xs text-mediumgrey font-bold mb-4">
          Subtasks ({task.subtask.filter((subtask) => !subtask.complete).length}
          of {task.subtask.length})
        </h3>
        {task.subtask.map((subtask) => (
          <Subtask subtask={subtask} />
        ))}
      </div>
    </div>
  );
};
