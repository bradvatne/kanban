import { ColumnsRow } from "@/types/supabase";
import React from "react";
import { Task } from "./Task";
import { useStore } from "@/lib/store";

const Column = ({ column }: { column: ColumnsRow }) => {
  const setTaskModal = useStore((state) => state.setTaskModal);
  return (
    <div className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide shrink-0">
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-[15px] h-[15px] ${column.color}`} />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {column.title} ({column.task.length})
        </span>
      </div>
      {column.task.map((task) => (
        <Task task={task} key={task.id} setTaskModal={setTaskModal} />
      ))}
    </div>
  );
};

export default Column;
