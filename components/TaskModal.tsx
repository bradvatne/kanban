"use client";
import React, { useEffect, useState } from "react";
import { Subtask } from "./Subtask";
import { useStore } from "@/lib/store";
import { ThreeDotButton } from "./ui/ThreeDotButton";
import { Modal } from "./ui/Modal";
import { useEscapeKey } from "@/lib/hooks";
import { EditTask } from "./EditTask";
import { ConfirmDeleteTask } from "./ConfirmDeleteTask";
import { getSupabaseClient } from "@/lib/supabaseClient";

type TaskModalProps = {
  id: number;
  setShowTaskModal: Function;
};

export const TaskModal = ({ id, setShowTaskModal }: TaskModalProps) => {
  useEscapeKey(() => setShowTaskModal(false));

  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const updateTask = useStore((state) => state.addTask);
  const task = useStore((state) => state.getTaskById(id)(state));
  const subtasks = useStore((state) =>
    Object.values(state.subtasks).filter((subtasks) => subtasks.taskid === id)
  );
  const statuses = useStore((state) =>
    Object.values(state.columns).filter(
      (column) => column.boardid === state.currentBoard
    )
  );
  const supabase = getSupabaseClient();

  const updateStatus = async (status: number) => {
    const prev = task.columnid;
    updateTask({ ...task, columnid: status });
    try {
      const { error } = await supabase
        .from("task")
        .update({ ...task, columnid: status })
        .eq("id", status);
      if (error) {
        updateTask({ ...task, columnid: prev });
        throw new Error(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (showDeleteConfirmation) {
    return <ConfirmDeleteTask task={task} />;
  }

  return (
    <Modal showModal={setShowTaskModal}>
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
              onClick={(e) => {
                setShowMiniMenu(!showMiniMenu);
              }}
              className="relative pl-4"
            >
              <ThreeDotButton />
              {showMiniMenu && (
                <div className="absolute flex p-4 flex-col gap-4 rounded-lg bg-white w-[12rem] -right-24 top-10 shadow-xl dark:bg-verydarkgrey ">
                  <button
                    className="text-mediumgrey text-custom text-left"
                    onClick={() => setShowEditTask(true)}
                  >
                    Edit Task
                  </button>
                  <button
                    className="text-red text-left"
                    onClick={() => setShowDeleteConfirmation(true)}
                  >
                    Delete Task
                  </button>
                </div>
              )}
            </div>
          </div>
          <div onClick={() => setShowMiniMenu(false)}>
            <p className="text-sm text-mediumgrey font-medium leading-6 my-[1.5rem]">
              {task.description}
            </p>
            <h3 className="text-xs text-mediumgrey font-bold mb-4">
              Subtasks ({subtasks.filter((subtask) => subtask.complete).length}{" "}
              of {subtasks.length})
            </h3>
            {subtasks.map((subtask) => (
              <Subtask id={subtask.id} key={subtask.id} />
            ))}
            <label className="text-mediumgrey text-xs pt-6 pb-2 font-bold dark:text-white">
              Current Status
            </label>
            <select
              className="block mt-2 w-full rounded-md py-[.5rem] px-[1rem] bg-white border-lightlines border focus:border-purple dark:bg-verydarkgrey dark:border-darklines hover:cursor-pointer"
              defaultValue={task.columnid}
              onChange={(e) => updateStatus(parseInt(e.target.value))}
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
          </div>
        </>
      )}
    </Modal>
  );
};
