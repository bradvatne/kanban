"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { CreateBoardModal } from "./CreateBoardModal";
import { TaskModal } from "./TaskModal";

export const Modals = () => {
  const boardModal = useStore((state) => state.boardModal);
  const setBoardModal = useStore((state) => state.setBoardModal);
  const taskModal = useStore((state) => state.taskModal);
  const setTaskModal = useStore((state) => state.setTaskModal);
  return (
    <>
      <div onClick={() => setBoardModal({ ...boardModal, visible: false })}>
        {boardModal.visible && <CreateBoardModal />}
      </div>
      <div onClick={() => setTaskModal({...taskModal, visible: false})}>
        {taskModal.visible && <TaskModal />}
      </div>
    </>
  );
};
