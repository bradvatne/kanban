import React from "react";

export const Left = () => {
  const boards = {
    length: 3,
  };
  return (
    <div className="w-[300px]">
      <div className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4">All Boards ({boards.length})</div>
    </div>
  );
};
