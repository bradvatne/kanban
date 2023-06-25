"use client";
import { CreateNewBoardButton } from "@/components/ui/CreateNewBoardButton";
import { SelectBoardButton } from "@/components/ui/SelectBoardButton";
import { useLayoutStore } from "@/lib/store";
import { BoardRow, Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

export const Left = () => {
  const client = createClientComponentClient<Database>();
  const setBoards = useLayoutStore((state) => state.setBoards);
  const boards = useLayoutStore((state) => state.boards);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await client.auth.getSession();
      const { data } = await client
        .from("board")
        .select()
        .eq("userid", session?.user.id);
      setBoards(data as BoardRow[]);
    };

    fetchData();
  }, [setBoards, client]);

  return (
    <div className="w-[300px]">
      <div className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4">
        All Boards ({boards.length})
      </div>
      <div className="pt-[1.2rem]">
      {boards && boards.length > 0 && boards.map((board) => <SelectBoardButton board={board} />)}
      </div>
    </div>
  );
};
