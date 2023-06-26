"use client";
import { State } from "@/lib/store";
import { ColumnsRow, Database, TaskRow } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { Task } from "./Task";

const Column = ({ column }: { column: ColumnsRow }) => {
  const client = createClientComponentClient<Database>();
  const [tasks, setTasks] = useState<TaskRow[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      const { data } = await client
        .from("task")
        .select("id, title, columnid, subtask (id, taskid, title, complete)")
        .eq("columnid", column.id);
      setTasks(data as TaskRow[]);
      console.log(data);
    };

    fetchColumns();
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
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
};

export default Column;
