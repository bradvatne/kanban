"use client";

import { XButton } from "./ui/XButton";

type AddSubtaskProps = {
  setSubtasks: Function;
  id: number;
};

export const AddSubtask = ({ setSubtasks, id }: AddSubtaskProps) => {
  
  const updateParent = (newValue: string) => {
    setSubtasks((state: string[]) =>
      state.map((item, index) => {
        if (index === id) {
          // Update the state for the desired index
          return newValue;
        } else {
          // Return the item as it is for other indices
          return item;
        }
      })
    );
  };

  return (
    <div className="flex items-center">
      <input
        onChange={(e) => updateParent(e.target.value)}
        type="text"
        className="block rounded-md dark:bg-verydarkgrey text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black dark:placeholder-mediumgrey placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        placeholder="Ex. Grab a coffee"
      />
      <div
        className="flex items-center justify-center pl-4 pb-4 hover:cursor-pointer h-full"
        onClick={() => console.log("thiung")}
      >
        <XButton />
      </div>
    </div>
  );
};
