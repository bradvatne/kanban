"use client";
import React, { useState } from "react";
import { AddTaskModal } from "./AddTaskModal";

export const AddFirstTask = ({ column }: { column: number }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  return (
    <>
      <div
        className="border-dotted border-4 rounded-xl light:border-mediumgrey dark:border-darkgrey p-4 text-mediumgrey font-bold hover:cursor-pointer"
        onClick={() => setShowAddTask(true)}
      >
        + Add a new task
      </div>
      {showAddTask && (
        <AddTaskModal setShowAddTaskModal={setShowAddTask} column={column} />
      )}
    </>
  );
};
