"use client";
import { CreateNewBoardButton } from "@/components/ui/CreateNewBoardButton";
import { SelectBoardButton } from "@/components/ui/SelectBoardButton";
import { useStore } from "@/lib/store";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

export const Left = () => {
  const supabase = createClientComponentClient<Database>();
  const setBoards = useStore((state) => state.setBoards);
  const boards = useStore((state) => state.boards);
  const setCurrentBoard = useStore((state) => state.setCurrentBoard);

  useEffect(() => {
    const fetchData = async () => {
      //Get User ID
      const {
        data: { session },
      } = await supabase.auth.getSession();
      //Fetch all user data in 1 query using join
      const { data } = await supabase
        .from("board")
        .select(
          "*, Columns (boardid, color, id, title, task (columnid, id, title, subtask(taskid, id, title, complete)))"
        )
        .eq("userid", session?.user.id);
      //Update store with query result
      if (data !== null) {
        setBoards(data);
        setCurrentBoard(data[0]);
      } else setBoards([]);
    };

    fetchData();
  }, [setBoards, supabase]);

  return (
    <div className="w-[300px] shrink-0 flex flex-col justify-between h-full">
      <div>
        <div className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4">
          All Boards ({boards.length})
        </div>
        <div className="pt-[1.2rem]">
          {boards &&
            boards.length > 0 &&
            boards.map((board) => (
              <SelectBoardButton board={board} key={board.id} />
            ))}
          <CreateNewBoardButton />
        </div>
      </div>
      <div>
        Hello
      </div>
    </div>
  );
};
