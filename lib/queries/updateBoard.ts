import { Database } from "@/types/supabase";
import { Board, Column } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";

type UpdateBoardProps = {
  board: Board;
  columns: Column[];
  title: string | null;
  supabase: SupabaseClient<Database>;
  addBoardToState: Function;
  addColumnToState: Function;
  setLoading: Function;
  setShowEditBoardModal: Function;
};
export const updateBoard = async ({
  board,
  columns,
  title,
  supabase,
  addBoardToState,
  addColumnToState,
  setLoading,
  setShowEditBoardModal,
}: UpdateBoardProps) => {
  setLoading(true);
  try {
    const userid = (await supabase.auth.getUser())?.data?.user?.id;
    if (!userid) {
      throw new Error(
        "Could not resolve userid. Please check your login status"
      );
    }

    const { data, error } = await supabase
      .from("board")
      .update({ id: board.id, title, userid })
      .eq("id", board.id)
      .select()
      .single();

    if (data) {
      addBoardToState(data);
      let boardid = data.id;

      for (const column of columns) {
        7;
        const { data, error } = await supabase
          .from("Columns")
          .upsert({
            id: column.id === -1 ? undefined : column.id,
            color: column.color,
            title: column.title,
            boardid: boardid,
          })
          .eq("id", column.id)
          .select()
          .single();

        if (data) {
          addColumnToState(data);
        }

        if (error) {
          console.log(`Problem adding column: ${column} , ${error.message}`);
        }
      }
    }
    setShowEditBoardModal(false);
    if (error) {
      throw new Error(`Problem adding board:  ${error.message}`);
    }
  } catch (err) {
    console.log(err);
  }
  setLoading(false);
  setShowEditBoardModal(false);
};
