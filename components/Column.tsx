"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Task } from "./Task";

const Column = ({ id }: { id: number }) => {
  const state = useStore();
  let filteredTasks = Object.values(state.tasks).filter(
    (task) => task.columnid === id
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(filteredTasks.length);
  }, [state]);

  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-full w-[15px] h-[15px] ${state.columns[id].color}`}
        />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {state.columns[id].title} ({count})
        </span>
      </div>
      {filteredTasks.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}
    </div>
  );
};

export default Column;
