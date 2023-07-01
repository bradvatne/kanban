"use client";
import React, { useEffect, useState } from "react";
import { ThreeDotButton } from "./ui/ThreeDotButton";

export const AddTaskButton = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAddTaskModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        className="rounded-3xl bg-purple hover:bg-purplehover text-white font-bold px-[1.5rem] py-3"
        onClick={() => setShowAddTaskModal(true)}
      >
        + Add New Task
      </button>
      {showAddTaskModal && (
        <div className="z-50 absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center top-0 left-0">
          <div className="w-[30rem] p-[2rem] bg-white rounded-md">
            <div className="flex justify-between items-center mb-[1.5rem]">
              <h2 className="text-xl text-black font-bold inline">
                Add New Task
              </h2>
            </div>
            <label
              className="text-xs text-mediumgrey font-bold"
              htmlFor="title"
            >
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
            <SubtaskInput />
            <SubtaskInput />
            <button className="bg-[#635FC71A] bg-opacity-10 py-2 flex w-full items-center justify-center rounded-3xl text-purple font-bold text-sm mb-6">
              + Add New Subtask
            </button>
            <label
              className="text-xs text-mediumgrey font-bold"
              htmlFor="title"
            >
              Status
            </label>
            <select className="block w-full rounded border border-[#828FA340] hover:cursor-pointer focus:border-purple focus:ring-1 focus:ring-purplehover mb-6">
              <option>Todo</option>
              <option>Todo</option>
            </select>
            <button className="bg-purple py-2 flex w-full items-center justify-center rounded-3xl text-white font-bold text-sm mb-2">
              Create Task
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const SubtaskInput = () => {
  const [text, setText] = useState("");
  return (
    <div className="flex items-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="block rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        placeholder="Ex. Make Coffee"
      />
      <div className="flex items-center justify-center pl-4 pb-4 hover:cursor-pointer h-full">
        <XButton />
      </div>
    </div>
  );
};

const XButton = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12.728"
        width="3"
        height="18"
        transform="rotate(45 12.728 0)"
        fill="#828FA3"
      />
      <rect
        y="2.12109"
        width="3"
        height="18"
        transform="rotate(-45 0 2.12109)"
        fill="#828FA3"
      />
    </svg>
  );
};
