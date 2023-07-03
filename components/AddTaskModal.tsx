"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "./ui/Modal";
import { useEscapeKey } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { SubtaskInput } from "./SubtaskInput";

export const AddTaskModal = ({
  setShowAddTaskModal,
}: {
  setShowAddTaskModal: Function;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const [subtasks, setSubtasks] = useState(["", ""]);

  useEscapeKey(() => setShowAddTaskModal(false));

  const columns = useStore((state) =>
    Object.values(state.columns).filter(
      (item) => item.boardId === state.currentBoard
    )
  );

  const [addTaskToState, addSubtaskToState] = useStore((state) => [
    state.addTask,
    state.addSubtask,
  ]);

  const addTaskToDatabase = async ({
    columnid,
    description,
    title,
    subtasks,
  }: {
    columnid: any;
    description: string;
    title: string;
    subtasks: string[];
  }) => {
    const supabase = getSupabaseClient();
    console.log("setting loading");
    try {
      console.log("starting try block");
      const { data, error } = await supabase
        .from("task")
        .insert({ title, columnid, description })
        .select();

      console.log(data);
      if (error) {
        console.log(error);
        throw error;
      }

      if (data) {
        console.log("data recieved, updating state");
        const typedData = data as any[];
        const id = typedData[0].id;

        addTaskToState({
          id,
          columnid,
          description,
          title,
        });

        console.log("state updated");
        for (let subtask of subtasks) {
          console.log(subtask, "subtasks");
          const { data, error } = await supabase
            .from("subtask")
            .insert({ taskid: id, title: subtask })
            .select();

          if (data) {
            const typedSubtaskData = data as any[];
            const { id, title, taskid, complete } = typedSubtaskData[0];
            console.log(id, title, taskid, complete);
            console.log("is that right ^^^^");
            addSubtaskToState({ id, title, taskid, complete });
            console.log();
          } else if (error) {
            console.log(error);
          }
        }
      }
      setShowAddTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h2 className="text-xl text-black font-bold inline">Add New Task</h2>
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
        Description
      </label>
      <input
        type="text"
        className="block rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
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
      {subtasks.map((_, id) => (
        <SubtaskInput setSubtasks={setSubtasks} key={id} id={id} />
      ))}
      <button className="bg-[#635FC71A] bg-opacity-10 py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-6">
        + Add New Subtask
      </button>
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Status
      </label>
      <select
        className="block w-full rounded border border-[#828FA340] hover:cursor-pointer focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        onChange={(e) => {
          console.log(e.target.value);
          setStatus(parseInt(e.target.value));
        }}
      >
        {columns.map((column) => (
          <option value={column.id} key={column.id}>
            {column.title}
          </option>
        ))}
      </select>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2"
        onClick={() => {
          addTaskToDatabase({
            columnid: status,
            title: title,
            description: description,
            subtasks: subtasks,
          });
        }}
      >
        Create Task
      </button>
    </Modal>
  );
};
