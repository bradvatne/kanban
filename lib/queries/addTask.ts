import { State } from "@/types/types";
import { getSupabaseClient } from "../supabaseClient";

export const addTask = async ({
  columnid,
  description,
  title,
  subtasks,
  setLoading,
  addTaskToState,
  addSubtaskToState,
  setShowAddTaskModal,
}: {
  columnid: any;
  description: string;
  title: string;
  subtasks: string[];
  setLoading: Function;
  addTaskToState: State["addTask"];
  addSubtaskToState: State["addSubtask"];
  setShowAddTaskModal: State["setShowAddTaskModal"];
}) => {
  const supabase = getSupabaseClient();
  setLoading(true);
  try {
    const { data, error } = await supabase
      .from("task")
      .insert({ title, columnid, description })
      .select()
      .single();

    if (error) {
      console.log(error);
      throw error;
    }

    if (data) {
      const { id } = data;
      addTaskToState({
        id,
        columnid,
        description,
        title,
      });

      for (let subtask of subtasks) {
        if (subtask.length > 0) {
          const { data, error } = await supabase
            .from("subtask")
            .insert({ taskid: id, title: subtask })
            .select()
            .single();

          if (data) {
            const { id, title, taskid, complete } = data;
            addSubtaskToState({ id, title, taskid, complete });
          } else if (error) {
            console.log(error);
          }
        }
      }
    }
    setShowAddTaskModal(false);
  } catch (error) {
    console.log(error);
  }
};
