"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { TaskCard } from "./TaskCard";
import { AddFirstTask } from "./AddFirstTask";

export const ColumnCard = ({ id }: { id: number }) => {
  const tasks = useStore((state) =>
    Object.values(state.tasks).filter((task) => task.columnid === id)
  );
  const column = useStore((state) => state.getColumnById(id)(state));
  const test = useStore((state) => state.columns);

  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide shrink-0">
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-[15px] h-[15px] ${column.color}`} />
        <span
          className="text-xs uppercase text-mediumgrey tracking-widest font-bold"
          onClick={() => console.log(test)}
        >
          {column.title} ({tasks?.length})
        </span>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard id={task.id} key={task.id} />)
      ) : (
        <AddFirstTask column={column.id} />
      )}
    </div>
  );
};

