"use client";
import React, { useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { useStore } from "@/lib/store";

export const AddTaskButton = ({ boardIsEmpty }: { boardIsEmpty: boolean }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useStore((state) => [
    state.showAddTaskModal,
    state.setShowAddTaskModal,
  ]);

  return (
    <>
      <button
        className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold disabled:bg-opacity-25 flex items-center justify-center w-[3rem] h-[2rem] md:w-[10.25rem] md:h-[3rem] "
        disabled={boardIsEmpty}
        onClick={() => setShowAddTaskModal(true)}
      >
        <span className="flex items-end text-2xl md:mr-1 md:text-md">+</span>
        <span className="hidden md:inline">Add New Task</span>
      </button>
      {showAddTaskModal && <AddTaskModal />}
    </>
  );
};
