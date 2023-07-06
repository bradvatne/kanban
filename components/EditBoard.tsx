import { useEscapeKey } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Board, Column } from "@/types/types";
import React, { useEffect, useState } from "react";
import { ColumnInput } from "./ui/ColumnInput";
import { Modal } from "./ui/Modal";
import { ConfirmDeleteBoard } from "./ConfirmDeleteBoard";

export const EditBoard = ({
  setShowBoardModal,
  board,
}: {
  setShowBoardModal: Function;
  board: Board;
}) => {
  const [title, setTitle] = useState(board.title);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  const addBoardToState = useStore((state) => state.addBoard);
  const addColumnToState = useStore((state) => state.addColumn);
  useEscapeKey(() => setShowBoardModal(false));

  const updateBoard = async () => {
    try {
      const userid = (await supabase.auth.getUser())?.data?.user?.id;
      if (!userid) {
        throw new Error(
          "Could not resolve userid. Please check your login status"
        );
      }
      console.log(`Attempting to update title ${title} to ${board.id}`);

      const { data, error } = await supabase
        .from("board")
        .update({ id: board.id, title, userid })
        .eq("id", board.id)
        .select()
        .single();

      if (data) {
        addBoardToState(data);
        let boardid = data.id;

        for (const column of columns) {
          7;
          const { data, error } = await supabase
            .from("Columns")
            .upsert({
              id: column.id === -1 ? undefined : column.id,
              color: column.color,
              title: column.title,
              boardid: boardid,
            })
            .eq("id", column.id)
            .select()
            .single();

          if (data) {
            addColumnToState(data);
          }

          if (error) {
            console.log(`Problem adding column: ${column} , ${error.message}`);
          }
        }
      }
      setShowBoardModal(false);
      if (error) {
        throw new Error(`Problem adding board:  ${error.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (showDeleteConfirmation) {
    return (
      <ConfirmDeleteBoard
        board={board}
        setShowDeleteBoardModal={setShowDeleteConfirmation}
      />
    );
  }
  return (
    <Modal showModal={setShowBoardModal}>
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
          console.log("adding", title, columns);
          updateBoard();
        }}
      >
        Save Changes
      </button>
    </Modal>
  );
};
