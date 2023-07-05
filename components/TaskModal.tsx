"use client";
import React, { useEffect, useState } from "react";
import { Subtask } from "./Subtask";
import { useStore } from "@/lib/store";
import { ThreeDotButton } from "./ui/ThreeDotButton";
import { removeTaskOptimistic } from "@/lib/queries";
import { Modal } from "./ui/Modal";
import { useEscapeKey } from "@/lib/hooks";
import { EditTask } from "./EditTask";

export const TaskModal = ({
  id,
  setShowTaskModal,
}: {
  id: number;
  setShowTaskModal: Function;
}) => {
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const task = useStore((state) => state.getTaskById(id)(state));
  const subtasks = useStore((state) =>
    Object.values(state.subtasks).filter((subtasks) => subtasks.taskid === id)
  );
  useEscapeKey(() => setShowTaskModal(false));

  const startEditTask = () => {
    setShowEditTask(true);
  };

  const removeTask = useStore((state) => state.removeTask);
  const statuses = useStore((state) =>
    Object.values(state.columns).filter(
      (column) => column.boardid === state.currentBoard
    )
  );
  return (
    <Modal>
      {showEditTask ? (
        <EditTask
          id={task.id}
          initialTitle={task.title!}
          initialDescription={task.description!}
          initialSubtasks={subtasks!}
          initialStatuses={statuses!}
          initialColumn={task.columnid}
          setShowTaskModal={setShowTaskModal}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-black dark:text-white font-bold inline">
              {task.title}
            </h2>
            <div
              onClick={() => setShowMiniMenu(!showMiniMenu)}
              className="relative pl-4"
            >
              <ThreeDotButton />
              {showMiniMenu && (
                <div className="absolute flex p-4 flex-col gap-4 rounded-lg bg-white w-[12rem] -right-24 top-10 shadow-xl dark:bg-verydarkgrey ">
                  <button
                    className="text-mediumgrey text-custom text-left"
                    onClick={() => startEditTask()}
                  >
                    Edit Task
                  </button>
                  <button
                    className="text-red text-left"
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
          <label className="text-mediumgrey text-xs pt-6 pb-2 font-bold dark:text-white">
            Current Status
          </label>
          <select
            className="block mt-2 w-full rounded-md py-[.5rem] px-[1rem] bg-white border-lightlines border focus:border-purple dark:bg-verydarkgrey dark:border-darklines"
            defaultValue={task.columnid}
          >
            {Object.values(statuses).map((status) => (
              <option
                className="text-mediumgrey my-1 hover:cursor-pointer"
                value={status.id}
                key={status.id}
              >
                {status.title}
              </option>
            ))}
          </select>
        </>
      )}
    </Modal>
  );
};
