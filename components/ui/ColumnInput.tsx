import { useStore } from "@/lib/store";
import { XButton } from "./XButton";
import { Column } from "@/types/types";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const ColumnInput = ({
  setColumns,
  arrayIndex,
  column,
}: {
  setColumns: Function;
  arrayIndex: number;
  column: Column;
}) => {
  const updateParent = (parentId: number, newValue: string) => {
    setColumns((state: Column[]) =>
      state.map((item, index) => {
        if (index === parentId) {
          // Update the state for the desired index
          return { ...item, title: newValue };
        } else {
          // Return the item as it is for other indices
          return item;
        }
      })
    );
  };

  const removeColumnFromState = useStore((state) => state.removeColumn);
  const addColumnToState = useStore((state) => state.addColumn);
  const defaultValue = column?.title;

  const deleteColumn = async () => {
    const supabase = getSupabaseClient();
    removeColumnFromState(column.id);

    try {
      const { data, error } = await supabase
        .from("Columns")
        .delete()
        .eq("id", column.id);

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      const { id, title, color } = column;
      addColumnToState({ id, title, color } as Column);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center">
      <input
        onChange={(e) => updateParent(arrayIndex, e.target.value)}
        type="text"
        className="block dark:placeholder-mediumgrey dark:bg-verydarkgrey rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        defaultValue={defaultValue!}
        placeholder="Ex. Make Coffee"
      />
      <div
        className="pl-4 flex items-center justify-center"
        onClick={() => deleteColumn()}
      >
        <XButton />
      </div>
    </div>
  );
};
