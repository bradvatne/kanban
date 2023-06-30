"use client";
import React, { useEffect } from "react";
import { Subtask } from "./Subtask";
import { useStore } from "@/lib/store";

export const TaskModal = ({
  id,
  setShowTaskModal,
}: {
  id: number;
  setShowTaskModal: Function;
}) => {
  const task = useStore((state) => state.getTaskById(id)(state));
  const subtasks = useStore((state) =>
    Object.values(state.subtasks).filter((subtasks) => subtasks.taskId === id)
  );
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

  return (
    <div
      className="z-50 absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center top-0 left-0"
    >
      <div className="w-[30rem] p-[2rem] bg-white rounded-md">
        <h2 className="text-xl text-black font-bold">{task.title}</h2>
        <p className="text-sm text-mediumgrey font-medium leading-6 my-[1.5rem]">
          {task.id}
        </p>
        <h3 className="text-xs text-mediumgrey font-bold mb-4">
          Subtasks ({subtasks.filter((subtask) => subtask.complete).length}
          of {subtasks.length})
        </h3>
        {subtasks.map((subtask) => (
          <Subtask id={subtask.id} key={subtask.id} />
        ))}
      </div>
    </div>
  );
};
