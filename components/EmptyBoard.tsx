"use client";
import React from "react";

export const EmptyBoard = ({
  setShowEditBoardModal,
}: {
  setShowEditBoardModal: Function;
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-mediumgrey flex-col">
      <p className="pb-8">
        This board is empty. Create a new column to get started
      </p>
      <button
        onClick={() => setShowEditBoardModal(true)}
        className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold px-[1.5rem] py-3"
      >
        + Add New Column
      </button>
    </div>
  );
};
