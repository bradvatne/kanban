"use client";
import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { useEscapeKey } from "@/lib/hooks";
import { ColumnInput } from "@/components/ui/ColumnInput";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";

type AddBoardModalProps = {
  setShowBoardModal: Function;
};

export const AddBoardModal = ({ setShowBoardModal }: AddBoardModalProps) => {
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { id: -1, title: "Todo", color: "bg-[#49C4E5]", boardid: -1 },
    {
      id: -1,
      title: "Finished",
      color: "bg-[#49C4E5]",
      boardid: -1,
    },
  ]);
  useEscapeKey(() => setShowBoardModal(false));

  const supabase = getSupabaseClient();
  const addBoardToState = useStore((state) => state.addBoard);
  const addColumnToState = useStore((state) => state.addColumn);
  const setCurrentBoard = useStore((state) => state.setCurrentBoard);
  const [loading, setLoading] = useState(false);

  const addBoard = async () => {
    const user = await supabase.auth.getUser();
    const userid = user?.data?.user?.id;
    if (!userid) {
      throw new Error("userid missing. Please check login status");
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("board")
        .insert({
          title,
          userid,
        })
        .select()
        .single();

      if (data) {
        const { id, title } = data;
        addBoardToState({
          id,
          title,
        });

        for (const column of columns) {
          const { data, error } = await supabase
            .from("Columns")
            .insert({
              title: column.title,
              color: column.color,
              boardid: id,
            })
            .select()
            .single();

          if (data) {
            addColumnToState(data);
            setCurrentBoard(id);
            setShowBoardModal(false);
          } else {
            throw new Error(`Error inserting column to db ${error.message}`);
          }
        }
      } else {
        throw new Error(
          `Error: Did not recieve data back from database insert ${error.message}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Modal showModal={setShowBoardModal}>Please Wait</Modal>
  ) : (
    <Modal showModal={setShowBoardModal}>
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
          console.log("adding", title, columns);
          addBoard();
        }}
      >
        Create Board
      </button>
    </Modal>
  );
};
