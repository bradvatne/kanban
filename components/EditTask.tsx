"use client";

import { Column, Subtask, Task } from "@/types/types";
import React, { useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { EditSubtask } from "./EditSubtask";
import { useStore } from "@/lib/store";

export const EditTask = ({
  id,
  initialTitle,
  initialDescription,
  initialSubtasks,
  initialStatuses,
  initialColumn,
  setShowTaskModal,
}: {
  id: number;
  initialTitle: string;
  initialDescription: string;
  initialSubtasks: Subtask[];
  initialStatuses: Column[];
  initialColumn: number;
  setShowTaskModal: Function;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [subtasks, setSubtasks] = useState(Object.values(initialSubtasks));
  const [statuses, setStatuses] = useState(initialStatuses);
  const [column, setColumn] = useState(initialColumn);

  const updateSubtasksState = useStore((state) => state.addSubtask);
  const updateTaskState = useStore((state) => state.addTask);
  const updateTask = async ({
    id,
    title,
    description,
    columnid,
    subtasks,
  }: {
    id: number;
    title: string;
    description: string;
    columnid: number;
    subtasks: Subtask[];
  }) => {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from("task")
        .update({
          title,
          description,
          columnid,
        })
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(`Error posting to db: ${error.message}`);
      }

      setSubtasks([]);
      for (const subtask of subtasks) {
        const { data, error } = await supabase
          .from("subtask")
          .upsert(subtask)
          .eq("taskid", id)
          .select()
          .single();

        if (data) {
          updateSubtasksState(data);
        }
        if (error) {
          throw new Error(
            `Error updating subtask#${subtask.id}: ${error.message}`
          );
        }
      }

      if (data) {
        updateTaskState(data[0] as Task);
        setShowTaskModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl text-black dark:text-white font-bold inline pb-[1.5rem]">
        Edit Task
      </h2>

      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        className="block rounded-md text-sm dark:text-white dark:bg-verydarkgrey border-[#828FA340] w-full mt-2  focus:outline-none  placeholder-black dark:placeholder-mediumgrey placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        id="title"
        placeholder="Ex. Take Coffee Break"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label
        className="text-xs text-mediumgrey font-bold"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        rows={5}
        className="resize-none block rounded-md text-sm dark:text-white dark:bg-verydarkgrey border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black dark:placeholder-mediumgrey placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        id="description"
        placeholder="Ex. It's always good to take a little break!"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label
        className="text-xs text-mediumgrey font-bold"
        htmlFor="description"
      >
        Subtasks
      </label>
      {initialSubtasks.map((subtask, id) => (
        <EditSubtask
          setSubtasks={setSubtasks}
          key={id}
          id={id}
          dbId={subtask.id}
          value={subtask.title}
        />
      ))}
      <button
        className="bg-[#635FC71A] bg-opacity-10 py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-6 hover:bg-purplehover"
        onClick={() =>
          setSubtasks((subtasks) => [
            ...subtasks,
            { title: "", id: 0, taskid: id, complete: false },
          ])
        }
      >
        + Add New Subtask
      </button>
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Status
      </label>
      <select
        className="block w-full dark:bg-verydarkgrey rounded border border-[#828FA340] hover:cursor-pointer focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        defaultValue={column}
        onChange={(e) => {
          console.log(e.target.value);
          setColumn(parseInt(e.target.value));
        }}
      >
        {statuses.map((status) => (
          <option
            value={status.id}
            key={status.id}
            className="dark:bg-verydarkgrey"
          >
            {status.title}
          </option>
        ))}
      </select>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2 hover:bg-purplehover"
        onClick={() =>
          updateTask({ id, title, description, columnid: column, subtasks })
        }
      >
        Save Changes
      </button>
    </div>
  );
};
