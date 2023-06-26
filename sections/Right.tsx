"use client";
import Column from "@/components/Column";
import { useStore } from "@/lib/store";
import { BoardRow, ColumnsRow, Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

export const Right = () => {
  const client = createClientComponentClient<Database>();
  const currentBoard = useStore((state) => state.currentBoard);
  const columns = useStore((state) => state.columns);
  const setColumns = useStore((state) => state.setColumns);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client
        .from("Columns")
        .select()
        .eq("boardid", currentBoard?.id);
      setColumns(data as ColumnsRow[]);
    };

    currentBoard && fetchData();
  }, [currentBoard, client]);

  return (
    <div className="bg-lightgrey w-full h-full outline outline-lightlines outline-1 flex gap-[1.5rem] pt-6 pl-6">
      {columns &&
        columns.map((column) => <Column column={column} key={column.id} />)}
    </div>
  );
};
