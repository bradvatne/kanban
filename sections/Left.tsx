"use client";
import { HideSidebarButton } from "@/components/HideSidebarButton";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { CreateNewBoardButton } from "@/components/ui/CreateNewBoardButton";
import { OpenEyeIcon } from "@/components/ui/OpenEyeIcon";
import { SelectBoardButton } from "@/components/ui/SelectBoardButton";
import { useStore } from "@/lib/store";
import { Database } from "@/types/supabase";
import { Board, Boards, Columns, Subtasks, Tasks } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";

export const Left = () => {
  const supabase = createClientComponentClient<Database>();
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
        let boards: Boards = {};
        let columns: Columns = {};
        let tasks: Tasks = {};
        let subtasks: Subtasks = {};
        for (let board of data) {
          // Add board to boards
          boards[board.id] = { id: board.id, title: board.title! };

          for (let column of board.Columns) {
            // Add column to columns
            columns[column.id] = {
              id: column.id,
              boardId: board.id,
              color: column.color!,
              title: column.title!,
            };

            for (let task of column.task) {
              // Add task to tasks
              tasks[task.id] = {
                id: task.id,
                columnId: column.id,
                title: task.title!,
              };

              for (let subtask of task.subtask) {
                // Add subtask to subtasks
                subtasks[subtask.id] = {
                  id: subtask.id,
                  taskId: task.id,
                  title: subtask.title,
                  complete: subtask.complete,
                };
              }
            }
          }
        }
        state.setBoards(boards);
        state.setColumns(columns);
        state.setTasks(tasks);
        state.setSubtasks(subtasks);
      } else console.log("something has gone wrong");
    };

    fetchData();
  }, [supabase]);

  return state.showLeftDrawer ? (
    <div className="w-[300px] shrink-0 flex flex-col justify-between h-full dark:bg-darkgrey">
      <div>
        <div className="uppercase text-xs text-mediumgrey tracking-widest font-bold pl-8 pt-4">
          All Boards ({Object.entries(state.boards).length})
        </div>
        <div className="pt-[1.2rem]">
          {state.boards &&
            Object.values(state.boards).map((board: Board) => (
              <SelectBoardButton board={board} key={board.id} />
            ))}
          <CreateNewBoardButton />
        </div>
      </div>
      <div>
        <ToggleThemeButton />
        <HideSidebarButton />
      </div>
    </div>
  ) : (
    <OpenEyeIcon />
  );
};
