import { Database } from "@/types/supabase";
import { Boards, Columns, Subtask, Subtasks, Task, Tasks } from "@/types/types";
import { State } from "./store";
import { SupabaseClient } from "@supabase/supabase-js";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "./supabaseClient";

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
      "*, Columns (boardid, color, id, title, task (columnid, id, title, description, subtask(taskid, id, title, complete)))"
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
            columnid: column.id,
            title: task.title!,
            description: task.description,
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

export const removeTaskOptimistic = async (
  id: number,
  removeTaskFromState: Function
) => {
  const supabase = getSupabaseClient();
  removeTaskFromState(id);

  try {
    const { error } = await supabase.from("task").delete().eq("id", id);

    if (error) {
      console.log(error);
      throw error;
    }
  } catch (error) {
    // If the server request fails, revert the optimistic update
    removeTaskFromState(id);
    // Handle the error appropriately (e.g., show a notification)
  }
};

export const addSubtaskToDatabase = async (
  subtask: Subtask,
  taskId: number
) => {};

export const addTaskToDatabase = async ({
  columnid,
  description,
  title,
  subtasks,
  addTaskToState,
  addSubtaskToState,
  setLoading,
}: {
  columnid: any;
  description: string;
  title: string;
  subtasks: string[];
  addTaskToState: State["addTask"];
  addSubtaskToState: State["addSubtask"];
  setLoading: Function;
}) => {
  const supabase = getSupabaseClient();
  setLoading(true);
  console.log("setting loading");
  try {
    console.log("starting try block");
    const { data, error } = await supabase
      .from("task")
      .insert({ title, columnid, description });

    if (error) {
      console.log(error);
      throw error;
    }

    if (data) {
      console.log("data recieved, updating state");
      const typedData = data as any[];
      const id = typedData[0].id;

      addTaskToState({
        id,
        columnid,
        description,
        title,
      });

      console.log("state updated");
      for (let subtask of subtasks) {
        const { data, error } = await supabase
          .from("subtask")
          .insert({ taskid: id, title: subtask });

        if (data) {
          const typedSubtaskData = data as any[];
          const { id, title, taskId, complete } = typedSubtaskData[0];
          addSubtaskToState({ id, title, taskId, complete });
        } else if (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
  setLoading(false);
};
