"use state";
import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { useEscapeKey } from "@/lib/hooks";
import { ColumnInput } from "@/components/ui/ColumnInput";

export const CreateBoardModal = ({
  setShowBoardModal,
}: {
  setShowBoardModal: Function;
}) => {
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([""]);
  useEscapeKey(() => setShowBoardModal(false));
  return (
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
        <ColumnInput setColumns={setColumns} id={idx} />
      ))}
      <button
        className="bg-[#635FC71A] bg-opacity-10  py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          setColumns((columns) => [...columns, ""]);
        }}
      >
        Add Column
      </button>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() => {
          console.log(title, columns);
        }}
      >
        Create Board
      </button>
    </Modal>
  );
};
