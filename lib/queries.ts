import { Database } from "@/types/supabase";
import { Boards, Columns, Subtask, Subtasks, Tasks } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "./supabaseClient";
import { State } from "@/types/types";


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
        columnid: parseInt(columnid!) as number,
        description,
        title,
      });

      console.log("state updated");
      for (let subtask of subtasks) {
        console.log("starting subtask");
        const { data, error } = await supabase
          .from("subtask")
          .insert({ taskid: id, title: subtask })
          .select();

        if (data) {
          const typedSubtaskData = data as any[];
          const { id, title, taskid, complete } = typedSubtaskData[0];
          addSubtaskToState({ id, title, taskid, complete });
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
