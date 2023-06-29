import { ColumnsRow } from "@/types/supabase";
import React from "react";
import { Task } from "./Task";

const Column = ({ column }: { column: ColumnsRow }) => {
  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-[15px] h-[15px] ${column.color}`} />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {column.title} ({column.task.length})
        </span>
      </div>
      {column.task.map((task) => (
        <Task taskId={task.id} key={task.id} />
      ))}
    </div>
  );
};

export default Column;
