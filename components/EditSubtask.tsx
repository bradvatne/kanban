"use client";
import { Subtask } from "@/types/types";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Icons } from "./ui/Icons";

export const EditSubtask = ({
  setSubtasks,
  id,
  dbId,
}: {
  setSubtasks: Function;
  id: number;
  dbId: number;
}) => {
  let title;
  if (dbId) {
    title = useStore((state) => state.getSubtaskById(dbId).title);
  }

  const updateParent = (newValue: string) => {
    setSubtasks((state: Subtask[]) =>
      state.map((item, index) => {
        if (index === id) {
          // Update the state for the desired index
          return { ...item, title: newValue };
        } else {
          // Return the item as it is for other indices
          return item;
        }
      })
    );
  };

  const removeFromParent = (id: number) => {
    setSubtasks((state: Subtask[]) => state.filter((_, index) => index !== id));
  };

  const removeSubtaskFromState = useStore((state) => state.removeSubtask);
  const addSubtaskToState = useStore((state) => state.addSubtask);
  const subtask = useStore((state) => state.getSubtaskById(id));

  const removeSubtaskOptimistic = async () => {
    removeSubtaskFromState(dbId);
    removeFromParent(id);
    const supabase = getSupabaseClient();

    try {
      const { error } = await supabase.from("subtask").delete().eq("id", dbId);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
      addSubtaskToState(subtask);
    }
  };

  return (
    <div className="flex items-center">
      <input
        onChange={(e) => updateParent(e.target.value)}
        type="text"
        className="block rounded-md dark:bg-verydarkgrey text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black dark:placeholder-mediumgrey placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        defaultValue={title ?? ""}
        placeholder="Ex. Grab a coffee"
      />
      <div
        className="flex items-center justify-center pl-4 pb-4 hover:cursor-pointer h-full"
        onClick={() => removeSubtaskOptimistic()}
      >
        <Icons.xButton />
      </div>
    </div>
  );
};
