import { Database } from "@/types/supabase";
import { Boards, Columns, Subtasks, Tasks } from "@/types/types";
import { State } from "./store";
import { SupabaseClient } from "@supabase/supabase-js";
export const fetchData = async (
  supabase: SupabaseClient<Database>,
  state: State
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("board")
    .select(
      "*, Columns (boardid, color, id, title, task (columnid, id, title, subtask(taskid, id, title, complete)))"
    )
    .eq("userid", session?.user.id);
  if (data !== null) {

    //Normalize data
    let boards: Boards = {};
    let columns: Columns = {};
    let tasks: Tasks = {};
    let subtasks: Subtasks = {};

    for (let board of data) {
      boards[board.id] = { id: board.id, title: board.title! };

      for (let column of board.Columns) {
        columns[column.id] = {
          id: column.id,
          boardId: board.id,
          color: column.color!,
          title: column.title!,
        };

        for (let task of column.task) {
          tasks[task.id] = {
            id: task.id,
            columnId: column.id,
            title: task.title!,
          };

          for (let subtask of task.subtask) {
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