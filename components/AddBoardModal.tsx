"use state";
import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import {useEscapeKey} from "@/lib/hooks";

export const CreateBoardModal = ({
  setShowBoardModal,
}: {
  setShowBoardModal: Function;
}) => {
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([]);
  useEscapeKey(() => setShowBoardModal(false));
  return (
    <Modal>
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h2 className="text-xl text-black font-bold inline">Add New Board</h2>
      </div>
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        className="block rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none  placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        id="title"
        placeholder="Ex. Take Coffee Break"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label
        className="text-xs text-mediumgrey font-bold"
        htmlFor="description"
      >
        Columns
      </label>
    </Modal>
  );
};
