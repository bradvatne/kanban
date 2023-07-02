"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Task } from "./Task";
import { Task as TaskType, Tasks } from "@/types/types";

const Column = ({ id }: { id: number }) => {
  const column = useStore((state) => state.getColumnById(id)(state));
  const allTasks = useStore((state) => state.tasks);
  const tasks = Object.values(allTasks).filter((task) => task.columnid === id);
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>();

  useEffect(() => {
    setFilteredTasks(
      Object.values(allTasks).filter((task) => task.columnid === id)
    );
  }, [allTasks]);
  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-[15px] h-[15px] ${column.color}`} />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {column.title} ({tasks.length})
        </span>
      </div>
      {filteredTasks?.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}
    </div>
  );
};

export default Column;
