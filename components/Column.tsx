"use client";
import { State } from "@/lib/store";
import { ColumnsRow, Database, TaskRow } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";

const Column = ({ column }: { column: ColumnsRow }) => {
  const client = createClientComponentClient<Database>();
  const [tasks, setTasks] = useState<TaskRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client
        .from("task")
        .select()
        .eq("columnid", column.id);
      setTasks(data as TaskRow[]);
    };

    fetchData();
  }, [column, client]);
  const color = `rounded-full w-[15px] h-[15px] ${column.color}`;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className={color} />
        <span className="text-xs uppercase text-mediumgrey tracking-widest font-bold">
          {column.title} ({tasks.length})
        </span>
      </div>
      {tasks.map((task) => (
        <div className="bg-white px-4 py-6 shrink-0 w-[17.5rem] rounded-lg shadow-custom hover:cursor-pointer">
          <div className="text-black font-bold text-custom">{task.title}</div>
          <div className="text-xs text-mediumgrey mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default Column;
