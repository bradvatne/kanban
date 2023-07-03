"use client";
import React, { useEffect, useState } from "react";
import { State, useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Modal } from "./ui/Modal";
import { AddTaskModal } from "./AddTaskModal";

export const AddTaskButton = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  return (
    <>
      <button
        className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold px-[1.5rem] py-3"
        onClick={() => setShowAddTaskModal(true)}
      >
        + Add New Task
      </button>
      {showAddTaskModal && (
        <AddTaskModal setShowAddTaskModal={setShowAddTaskModal} />
      )}
    </>
  );
};
