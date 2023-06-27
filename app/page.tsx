"use client";
import Top from "@/sections/Top";
import { Left } from "@/sections/Left";
import { Right } from "@/sections/Right";
import { Modals } from "@/components/Modals";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { createStore } from "zustand";

export default function Index() {
  const supabase = createClientComponentClient();
  const store = createStore();
  const state = useStore();

  useEffect(() => {
    const fetchData = async () => {
      //Get User ID
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      //Fetch all user data in 1 query using join
      const { data } = await supabase
        .from("board")
        .select(
          "*, Columns (boardid, color, id, title, task (columnid, id, title, subtask(taskid, id, title, complete)))"
        )
        .eq("userid", session?.user.id);
      //Update store with query result
      if (data !== null) {
        state.setBoards(data);
        state.setCurrentBoard(data[0]);
      } else state.setBoards([]);
    };

    fetchData();
  }, [state.setBoards, supabase]);
  return (
    state && (
      <div className="h-full relative">
        <Modals
          boardModal={state.boardModal}
          currentBoard={state.currentBoard!}
          taskModal={state.taskModal}
        />
        <Top />
        <div className="flex test">
          <Left boards={state.boards} />
          <Right currentBoard={state.currentBoard!} />
        </div>
      </div>
    )
  );
}
