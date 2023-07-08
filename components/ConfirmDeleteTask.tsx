"use clients";
import React from "react";
import { Modal } from "./ui/Modal";
import { removeTaskOptimistic } from "@/lib/queries";
import { Task } from "@/types/types";
import { useStore } from "@/lib/store";

type ConfirmDeleteProps = {
  task: Task;
};

export const ConfirmDeleteTask = ({ task }: ConfirmDeleteProps) => {
  const removeTaskFromState = useStore((state) => state.removeTask);
  return (
    <Modal>
      <h2 className="text-lg font-bold text-red mb-[1.5rem]">
        Delete this task?
      </h2>
      <p className="text-sm text-mediumgrey font-medium leading-6 mb-[1.5rem]">
        Are you sure you want to delete the '{task.title}' task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="flex">
        <button
          className="bg-red text-white rounded-3xl w-[12.5rem] h-[2.5rem] font-bold text-sm mr-4"
          onClick={() => removeTaskOptimistic(task.id, removeTaskFromState)}
        >
          Delete
        </button>
        <button className="bg-purplehover text-purple rounded-3xl w-[12.5rem] h-[2.5rem] font-bold text-sm">
          Cancel
        </button>
      </div>
    </Modal>
  );
};
