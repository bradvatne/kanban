"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "./ui/Modal";
import { useEscapeKey } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { AddSubtask } from "./AddSubtask";

type AddTaskModalProps = {
  setShowAddTaskModal: Function;
};

export const AddTaskModal = ({ setShowAddTaskModal }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const [subtasks, setSubtasks] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [addTaskToState, addSubtaskToState] = useStore((state) => [
    state.addTask,
    state.addSubtask,
  ]);
  useEscapeKey(() => setShowAddTaskModal(false));

  const columns = useStore((state) =>
    Object.values(state.columns).filter(
      (item) => item.boardid === state.currentBoard
    )
  );
  const defaultStatus = columns && columns[0] && columns[0]?.id;

  useEffect(() => {
    setStatus(defaultStatus);
  }, []);

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
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("task")
        .insert({ title, columnid, description })
        .select()
        .single();

      if (error) {
        console.log(error);
        throw error;
      }

      if (data) {
        const { id } = data;
        addTaskToState({
          id,
          columnid,
          description,
          title,
        });

        for (let subtask of subtasks) {
          if (subtask.length > 0) {
            const { data, error } = await supabase
              .from("subtask")
              .insert({ taskid: id, title: subtask })
              .select()
              .single();

            if (data) {
              const { id, title, taskid, complete } = data;
              addSubtaskToState({ id, title, taskid, complete });
            } else if (error) {
              console.log(error);
            }
          }
        }
      }
      setShowAddTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Modal>Loading...</Modal>
  ) : (
    <Modal>
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h2 className="text-xl text-black dark:text-white font-bold inline">
          Add New Task
        </h2>
      </div>
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
      <input
        type="text"
        className="block rounded-md text-sm dark:text-white dark:bg-verydarkgrey border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black dark:placeholder-mediumgrey placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
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
        <AddSubtask setSubtasks={setSubtasks} key={id} id={id} />
      ))}
      <button
        className="bg-[#635FC71A] bg-opacity-10 py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-6 hover:bg-purplehover"
        onClick={() => setSubtasks((subtasks) => [...subtasks, ""])}
      >
        + Add New Subtask
      </button>
      <label className="text-xs text-mediumgrey font-bold" htmlFor="title">
        Status
      </label>
      <select
        className="block w-full dark:bg-verydarkgrey rounded border border-[#828FA340] hover:cursor-pointer focus:border-purple focus:ring-1 focus:ring-purplehover mb-6"
        defaultValue={defaultStatus}
        onChange={(e) => {
          console.log(e.target.value);
          setStatus(parseInt(e.target.value));
        }}
      >
        {columns.map((column) => (
          <option
            value={column.id}
            key={column.id}
            className="dark:bg-verydarkgrey"
          >
            {column.title}
          </option>
        ))}
      </select>
      <button
        className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2 hover:bg-purplehover"
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
