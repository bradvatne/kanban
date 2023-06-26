"use client";
import { Database, SubtaskRow, TaskRow } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export const Task = ({ task }: { task: TaskRow }) => {
  const client = createClientComponentClient<Database>();
  const [subtasks, setSubtasks] = useState<SubtaskRow[]>([]);
 
  return (
    <div className="bg-white px-4 py-6 shrink-0 w-[17.5rem] rounded-lg shadow-custom hover:cursor-pointer">
      <div className="text-black font-bold text-custom">{task.title}</div>
      <div className="text-xs text-mediumgrey mt-2 font-bold">
        {subtasks?.filter((subtask) => subtask?.complete === false).length ?? 0}{" "}
        out of {subtasks?.length ?? 0} subtasks
      </div>
    </div>
  );
};

/*

export type BoardRow = Database['public']['Tables']['board']['Row'];
export type ColumnsRow = Database['public']['Tables']['Columns']['Row'];
export type TaskRow = Database['public']['Tables']['task']['Row'];
export type UsersRow = Database['public']['Tables']['Users']['Row'];

*/
