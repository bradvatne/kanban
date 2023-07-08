"use clients";
import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Board, Task } from "@/types/types";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";

type ConfirmDeleteBoardProps = {
  board: Board;
  setShowDeleteBoardModal: Function;
  setShowMiniMenu?: Function;
};

export const ConfirmDeleteBoard = ({
  board,
  setShowDeleteBoardModal,
  setShowMiniMenu,
}: ConfirmDeleteBoardProps) => {

  const removeBoardFromState = useStore((state) => state.removeBoard);
  const addBoard = useStore((state) => state.addBoard);
  const setCurrentBoard = useStore((state) => state.setCurrentBoard);
  const [loading, setLoading] = useState(false);

  const removeBoardOptimistic = async () => {
    const supabase = getSupabaseClient();

    setLoading(true);
    setShowMiniMenu && setShowMiniMenu(false);
    removeBoardFromState(board.id);

    try {
      const { error } = await supabase
        .from("board")
        .delete()
        .eq("id", board.id);

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      console.log("error deleting board from db: ", err);
      addBoard(board);
    }

    setCurrentBoard(undefined);
    setShowDeleteBoardModal(false);
  };

  return loading ? (
    <Modal>Please Wait</Modal>
  ) : (
    <Modal>
      <h2 className="text-lg font-bold text-red mb-[1.5rem]">
        Delete this task?
      </h2>
      <p className="text-sm text-mediumgrey font-medium leading-6 mb-[1.5rem]">
        Are you sure you want to delete the '{board.title}' task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="flex">
        <button
          className="bg-red text-white rounded-3xl w-[12.5rem] h-[2.5rem] font-bold text-sm mr-4"
          onClick={() => removeBoardOptimistic()}
        >
          Delete
        </button>
        <button
          className="bg-purplehover text-purple rounded-3xl w-[12.5rem] h-[2.5rem] font-bold text-sm"
          onClick={() => setShowDeleteBoardModal(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
