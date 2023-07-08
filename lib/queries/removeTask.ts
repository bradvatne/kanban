import { getSupabaseClient } from "@/lib/supabaseClient";

export const removeTaskOptimistic = async (
  id: number,
  removeTaskFromState: Function
) => {
  const supabase = getSupabaseClient();

  try {
    const { error } = await supabase.from("task").delete().eq("id", id);

    if (error) {
      console.log(error);
      throw error;
    }
  } catch (error) {
    // If the server request fails, revert the optimistic update
    console.log(error);
    // Handle the error appropriately (e.g., show a notification)
  }
  removeTaskFromState(id);
};
