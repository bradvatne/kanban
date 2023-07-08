import { Database } from "@/types/supabase";
import { Column } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";

type AddBoardProps = {
  title: string;
  columns: Column[];
  supabase: SupabaseClient<Database>;
  addBoardToState: Function;
  addColumnToState: Function;
  setLoading: Function;
  setCurrentBoard: Function;
  setShowBoardModal: Function;
};

export const addBoard = async ({
  title,
  columns,
  supabase,
  addBoardToState,
  addColumnToState,
  setLoading,
  setCurrentBoard,
  setShowBoardModal,
}: AddBoardProps) => {
  const user = await supabase.auth.getUser();
  const userid = user?.data?.user?.id;
  if (!userid) {
    throw new Error("userid missing. Please check login status");
  }

  setLoading(true);
  try {
    const { data, error } = await supabase
      .from("board")
      .insert({
        title,
        userid,
      })
      .select()
      .single();

    if (data) {
      const { id, title } = data;
      addBoardToState({
        id,
        title,
      });

      for (const column of columns) {
        const { data, error } = await supabase
          .from("Columns")
          .insert({
            title: column.title,
            color: column.color,
            boardid: id,
          })
          .select()
          .single();
        if (error) {
          throw new Error(`Error inserting column to db ${error.message}`);
        }
      }
      if (data) {
        addColumnToState(data);
        setCurrentBoard(id);
        setShowBoardModal(false);
      }
    } else {
      throw new Error(
        `Error: Did not recieve data back from database insert ${error.message}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};
