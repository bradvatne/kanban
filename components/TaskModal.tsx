"use client";
import React, { useEffect, useState } from "react";
import { Subtask } from "./Subtask";
import { useStore } from "@/lib/store";
import { ThreeDotButton } from "./ui/ThreeDotButton";
import { removeTaskOptimistic } from "@/lib/queries";

export const TaskModal = ({
  id,
  setShowTaskModal,
}: {
  id: number;
  setShowTaskModal: Function;
}) => {
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const task = useStore((state) => state.getTaskById(id)(state));
  const subtasks = useStore((state) =>
    Object.values(state.subtasks).filter((subtasks) => subtasks.taskid === id)
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

  const removeTask = useStore((state) => state.removeTask);
  const statuses = useStore((state) =>
    Object.values(state.columns).filter(
      (column) => column.boardId === state.currentBoard
    )
  );
  return (
    <div className="z-50 absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center top-0 left-0">
      <div className="w-[30rem] p-[2rem] bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-black font-bold inline">{task.title}</h2>
          <div
            onClick={() => setShowMiniMenu(!showMiniMenu)}
            className="relative pl-4"
          >
            <ThreeDotButton />
            {showMiniMenu && (
              <div className="absolute flex p-4 flex-col gap-4 rounded-lg bg-white w-[12rem] -right-24 top-10 shadow-xl">
                <button className="text-mediumgrey text-custom">
                  Edit Task
                </button>
                <button
                  className="text-red"
                  onClick={() => removeTaskOptimistic(task.id, removeTask)}
                >
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-mediumgrey font-medium leading-6 my-[1.5rem]">
          {task.description}
        </p>
        <h3 className="text-xs text-mediumgrey font-bold mb-4">
          Subtasks ({subtasks.filter((subtask) => subtask.complete).length} of{" "}
          {subtasks.length})
        </h3>
        {subtasks.map((subtask) => (
          <Subtask id={subtask.id} key={subtask.id} />
        ))}
        <label className="text-mediumgrey text-xs pt-6 pb-2 font-bold">
          Current Status
        </label>
        <select className="block mt-2 w-full rounded-md py-[.5rem] px-[1rem] bg-white border-lightlines border focus:border-purple">
          {Object.values(statuses).map((status) => (
            <option
              className="text-mediumgrey my-1 hover:cursor-pointer"
              key={status.id}
            >
              {status.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
