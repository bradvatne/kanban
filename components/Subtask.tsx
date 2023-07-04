"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const Subtask = ({ id }: { id: number }) => {
  const completedStyle = "text-sm text-mediumgrey font-bold line-through";
  const inProgressStyle = "text-sm text-black font-bold dark:text-white";

  const subtask = useStore((state) => state.getSubtaskById(id)(state));
  const toggleSubtaskComplete = useStore(
    (state) => state.toggleSubtaskComplete
  );

  const toggleSubtaskOnDatabase = async () => {
    const supabase = getSupabaseClient();

    try {
      console.log("trying to update");
      const { data, error } = await supabase
        .from("subtask")
        .update({ complete: !subtask.complete })
        .eq("id", subtask.id);
      if (error) {
        throw new Error(error?.message);
      } else {
        console.log("success");
        toggleSubtaskComplete(subtask.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="rounded bg-lightgrey flex gap-4 mb-2 p-3 hover:bg-purplehover dark:bg-verydarkgrey dark:hover:bg-purplehover dark:hover:bg-opacity-25"
      onClick={(e) => {
        toggleSubtaskOnDatabase();
      }}
    >
      <input
        type="checkbox"
        className="text-purple"
        checked={subtask.complete}
        onChange={() => {}}
      />
      <span className={subtask.complete ? completedStyle : inProgressStyle}>
        {subtask?.title}
      </span>
    </div>
  );
};
