"use client";
import React, { useEffect } from "react";
import { Subtask } from "./Subtask";
import { SubtaskRow, TaskRow } from "@/types/supabase";
import { useStore } from "@/lib/store";

export const TaskModal = ({
  task,
  setShowTaskModal,
}: {
  task: TaskRow;
  setShowTaskModal: Function;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowTaskModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const boards = useStore((state) => state.boards);

  const subtasks = boards.flatMap((board) =>
    board.Columns.flatMap((column) =>
      column.task.flatMap((task) =>
        task.subtask.filter((subtask) => subtask.id === task.id)
      )
    )
  );
  
  return (
    <div
      className="z-50 absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center top-0 left-0"
      onClick={() => setShowTaskModal(false)}
    >
      <div className="w-[30rem] p-[2rem] bg-white rounded-md">
        <h2 className="text-xl text-black font-bold">{task.title}</h2>
        <p className="text-sm text-mediumgrey font-medium leading-6 my-[1.5rem]">
          {task.id}
        </p>
        <h3 className="text-xs text-mediumgrey font-bold mb-4">
          Subtasks ({task.subtask.filter((subtask) => !subtask.complete).length}
          of {task.subtask.length})
        </h3>
        {subtasks.map((subtask) => (
          <Subtask subtask={subtask} complete={subtask.complete} />
        ))}
      </div>
    </div>
  );
};
