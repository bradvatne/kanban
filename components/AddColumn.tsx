import React from "react";

export const AddColumn = ({
  setShowEditBoardModal,
}: {
  setShowEditBoardModal: Function;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold opacity-0 mb-5">
        Spacer
      </span>
      <div
        onClick={() => setShowEditBoardModal(true)}
        className="w-[17.5rem] bg-gradient mb-6 rounded-lg shadow-custom dark:bg-darkgrey flex justify-center items-center text-mediumgrey text-2xl font-bold h-full hover:cursor-pointer no-scrollbar"
      >
        + New Column
      </div>
    </div>
  );
};
