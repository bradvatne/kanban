import { Database } from "@/types/supabase";
import { Boards, Columns, Subtasks, Tasks } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { State } from "@/types/types";

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
      "*, Columns (boardid, color, id, title, task (columnid, id, title, description, position, subtask(taskid, id, title, complete)))"
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
          boardid: board.id,
          color: column.color!,
          title: column.title!,
        };

        for (let task of column.task) {
          tasks[task.id] = {
            id: task.id,
            columnid: column.id,
            title: task.title!,
            description: task.description,
            position: task.position!,
          };

          for (let subtask of task.subtask) {
            subtasks[subtask.id] = {
              id: subtask.id,
              taskid: task.id,
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
    console.log(Object.values(state.boards));
    state.setCurrentBoard(data[0].id);
  } else console.log("something has gone wrong");
};
