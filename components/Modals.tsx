"use client";
import React from "react";
import { useLayoutStore } from "@/lib/store";
import { CreateBoardModal } from "./CreateBoardModal";
import { TaskModal } from "./TaskModal";

export const Modals = () => {
  const boardModal = useLayoutStore((state) => state.boardModal);
  const setBoardModal = useLayoutStore((state) => state.setBoardModal);
  const taskModal = useLayoutStore((state) => state.taskModal);
  const setTaskModal = useLayoutStore((state) => state.setTaskModal);
  return (
    <>
      <div onClick={() => setBoardModal({ ...boardModal, visible: false })}>
        {boardModal.visible && <CreateBoardModal />}
      </div>
      <div onClick={() => setTaskModal(taskModal as any, "VIEW", false)}>
        {taskModal.visible && <TaskModal />}
      </div>
    </>
  );
};
