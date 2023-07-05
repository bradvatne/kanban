import { useEscapeKey } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Column } from "@/types/types";
import React, { useState } from "react";
import { ColumnInput } from "./ui/ColumnInput";
import { Modal } from "./ui/Modal";

export const EditBoard = ({
  setShowBoardModal,
  id,
}: {
  setShowBoardModal: Function;
  id: number;
}) => {
  const { title } = useStore((state) => state.boards[id]);
  const initialColumns = useStore((state) =>
    Object.values(state.columns).filter((column) => column.boardId === id)
  );

  const [columns, setColumns] = useState(
    initialColumns.length > 0 || [
      {
        id: 0,
        title: "",
        description: "",
        color: "",
        boardId: id,
      },
    ]
  );
  const [text, setText] = useState(title);

  useEscapeKey(() => setShowBoardModal(false));

  const supabase = getSupabaseClient();
  const addBoardToState = useStore((state) => state.addBoard);
  const addColumnToState = useStore((state) => state.addColumn);

  const updateBoard = () => {};

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
        onChange={(e) => setText(e.target.value)}
      />
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Columns
      </label>

      {columns.map((column, idx) => (
        <ColumnInput
          setColumns={setColumns}
          id={idx}
          key={idx}
          dbId={column.id}
        />
      ))}
      <button
        className="bg-[#635FC71A] bg-opacity-10  py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          setColumns((columns) => [
            ...columns,
            { id: 0, title: "", description: "", color: "", boardId: id },
          ]);
        }}
      >
        Add Column
      </button>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          console.log("adding", title, columns);
          updateBoard();
        }}
      >
        Create Board
      </button>
    </Modal>
  );
};
