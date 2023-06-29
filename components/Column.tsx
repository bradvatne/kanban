"use client";
import React from "react";
import { Task } from "./Task";
import { useStore } from "@/lib/store";

const Column = ({ id }: { id: number }) => {
  const column = useStore((state) => state.getColumnById(id)(state));
  const allTasks = useStore((state) => state.tasks);
  const tasks = Object.values(allTasks).filter((task) => task.columnId === id);
  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-[15px] h-[15px] ${column.color}`} />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {column.title} ({tasks.length})
        </span>
      </div>
      {tasks.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}
    </div>
  );
};

export default Column;
