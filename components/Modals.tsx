"use client";
import React from "react";
import { BoardModalType, TaskModalType, useStore } from "@/lib/store";
import { CreateBoardModal } from "./CreateBoardModal";
import { TaskModal } from "./TaskModal";
import { BoardRow } from "@/types/supabase";

export const Modals = ({
  currentBoard,
  taskModal,
  boardModal,
}: {
  currentBoard: BoardRow;
  taskModal: TaskModalType;
  boardModal: BoardModalType;
}) => {
  const setBoardModal = useStore((state) => state.setBoardModal);
  const setTaskModal = useStore((state) => state.setTaskModal);
  return (
    <>
      <div onClick={() => setBoardModal({ ...boardModal, visible: false })}>
        {boardModal?.visible && <CreateBoardModal />}
      </div>
      <div onClick={() => setTaskModal({ ...taskModal, visible: false })}>
        {taskModal?.visible && <TaskModal task={taskModal.taskData!} />}
      </div>
    </>
  );
};
