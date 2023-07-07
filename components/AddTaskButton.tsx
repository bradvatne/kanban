"use client";
import React, { useState } from "react";
import { AddTaskModal } from "./AddTaskModal";

export const AddTaskButton = ({ boardIsEmpty }: { boardIsEmpty: boolean }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  return (
    <>
      <button
        className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold md:px-[1.5rem] md:py-3 disabled:bg-opacity-25 flex items-center justify-center py-1 px-5"
        disabled={boardIsEmpty}
        onClick={() => setShowAddTaskModal(true)}
      >
        <span className="text-bold text-4xl">+</span>{" "}
        <span className="hidden md:inline">Add New Task</span>
      </button>
      {showAddTaskModal && (
        <AddTaskModal setShowAddTaskModal={setShowAddTaskModal} />
      )}
    </>
  );
};
