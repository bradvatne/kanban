"use client";
import { Subtask } from "@/types/types";
import { XButton } from "./ui/XButton";
import { useStore } from "@/lib/store";

export const EditSubtask = ({
  setSubtasks,
  id,
  dbId,
}: {
  setSubtasks: Function;
  id: number;
  dbId: number;
}) => {
  const { title } = useStore((state) => state.getSubtaskById(dbId)(state));
  const state = useStore((state) => state.subtasks);
  const updateParent = (parentId: number, newValue: string) => {
    setSubtasks((state: Subtask[]) =>
      state.map((item, index) => {
        if (index === parentId) {
          // Update the state for the desired index
          return { ...item, title: newValue };
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
        onChange={(e) => updateParent(id, e.target.value)}
        type="text"
        className="block rounded-md dark:bg-verydarkgrey text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black dark:placeholder-mediumgrey placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        defaultValue={title ?? ""}
        placeholder="Ex. Grab a coffee"
      />
      <div
        className="flex items-center justify-center pl-4 pb-4 hover:cursor-pointer h-full"
        onClick={() => console.log(state)}
      >
        <XButton />
      </div>
    </div>
  );
};
