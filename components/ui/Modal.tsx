import React, { ReactNode } from "react";

export const Modal = ({
  children,
  showModal,
}: {
  children: ReactNode;
  showModal: Function;
}) => {
  return (
    <div
      className="z-50 absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center top-0 left-0"
      onClick={() => showModal(false)}
    >
      <div
        className="w-[30rem] p-[2rem] bg-white dark:bg-darkgrey rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
