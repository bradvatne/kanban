"use client";
import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { ColumnInput } from "@/components/ui/ColumnInput";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { addBoard } from "@/lib/queries/addBoard";

export const AddBoardModal = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([
    { id: -1, title: "Todo", color: "bg-[#49C4E5]", boardid: -1 },
    {
      id: -1,
      title: "Finished",
      color: "bg-[#49C4E5]",
      boardid: -1,
    },
  ]);

  const supabase = getSupabaseClient();
  const [
    setShowBoardModal,
    addBoardToState,
    addColumnToState,
    setCurrentBoard,
  ] = useStore((state) => [
    state.setShowBoardModal,
    state.addBoard,
    state.addColumn,
    state.setCurrentBoard,
  ]);

  return loading ? (
    <Modal>Please Wait</Modal>
  ) : (
    <Modal>
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h2 className="text-xl text-black font-bold inline dark:text-white">
          Add New Board
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Columns
      </label>
      {columns.map((column, idx) => (
        <ColumnInput
          setColumns={setColumns}
          arrayIndex={idx}
          column={column}
          key={idx}
        />
      ))}
      <button
        className="bg-[#635FC71A] bg-opacity-10  py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() =>
          setColumns((columns) => [
            ...columns,
            { id: -1, title: "", color: "bg-[#49C4E5]", boardid: -1 },
          ])
        }
      >
        Add Column
      </button>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          addBoard({
            title,
            columns,
            supabase,
            addBoardToState,
            addColumnToState,
            setLoading,
            setCurrentBoard,
            setShowBoardModal,
          });
        }}
      >
        Create Board
      </button>
    </Modal>
  );
};
