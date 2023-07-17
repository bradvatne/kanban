import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import React, { useState } from "react";
import { ColumnInput } from "./ui/ColumnInput";
import { Modal } from "./ui/Modal";
import { ConfirmDeleteBoard } from "./ConfirmDeleteBoard";
import { updateBoard } from "@/lib/queries/updateBoard";

export const EditBoard = ({
  setShowMiniMenu,
}: {
  setShowMiniMenu?: Function;
}) => {
  const [board, setShowEditBoardModal, addBoardToState, addColumnToState] =
    useStore((state) => [
      state.getBoardById(state.currentBoard!),
      state.setShowEditBoardModal,
      state.addBoard,
      state.addColumn,
    ]);
  const [title, setTitle] = useState(board.title);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialColumns = useStore((state) =>
    Object.values(state.columns).filter((column) => column.boardid === board.id)
  );

  const [columns, setColumns] = useState(
    initialColumns.length > 0
      ? initialColumns
      : [
          {
            id: 0,
            title: "",
            description: "",
            color: "",
            boardid: board.id,
          },
        ]
  );

  const supabase = getSupabaseClient();

  if (showDeleteConfirmation) {
    return (
      <ConfirmDeleteBoard
        board={board}
        setShowDeleteBoardModal={setShowDeleteConfirmation}
        setShowMiniMenu={setShowMiniMenu}
      />
    );
  }

  if (loading) {
    return <Modal>Please wait...</Modal>;
  }

  return (
    <Modal>
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h2 className="text-xl text-black font-bold inline dark:text-white">
          Edit Board
        </h2>
      </div>
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        className="block rounded-md dark:placeholder-mediumgrey dark:bg-verydarkgrey text-sm border-[#828FA340] w-full mt-2  focus:outline-none  placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        id="title"
        placeholder="Ex. Product Launch"
        value={title!}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Columns
      </label>

      {columns.map((column, idx) => (
        <ColumnInput
          setColumns={setColumns}
          arrayIndex={idx}
          key={idx}
          column={column}
        />
      ))}
      <button
        className="bg-[#635FC71A] bg-opacity-10  py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          setColumns((columns) => [
            ...columns,
            { id: -1, title: "", color: "bg-[#49C4E5]", boardid: board.id },
          ]);
        }}
      >
        Add Column
      </button>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          updateBoard({
            board,
            columns,
            title,
            supabase,
            addBoardToState,
            addColumnToState,
            setLoading,
            setShowEditBoardModal,
          });
        }}
      >
        Save Changes
      </button>
    </Modal>
  );
};
