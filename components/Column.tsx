"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Task } from "./Task";
import { Task as TaskType, Tasks } from "@/types/types";

const Column = ({ id }: { id: number }) => {
  const { tasks, columns } = useStore();

  console.log("hello");
  const filteredTasks = Object.values(tasks).filter(
    (task) => task.columnid === id
  );
  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-full w-[15px] h-[15px] ${columns[id].color}`}
        />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {columns[id].title} ({Object.values(tasks).filter(task => task.columnid === id).length})
        </span>
      </div>
      {filteredTasks.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}
    </div>
  );
};

export default Column;
