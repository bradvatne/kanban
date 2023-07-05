import { useStore } from "@/lib/store";
import { XButton } from "./XButton";

export const ColumnInput = ({
  setColumns,
  id,
  dbId,
}: {
  setColumns: Function;
  id: number;
  dbId?: number;
}) => {
  const updateParent = (parentId: number, newValue: string) => {
    setColumns((state: string[]) =>
      state.map((item, index) => {
        if (index === parentId) {
          // Update the state for the desired index
          return newValue;
        } else {
          // Return the item as it is for other indices
          return item;
        }
      })
    );
  };
  let defaultValue;

  if (dbId) {
    defaultValue = useStore((state) => state?.columns[dbId]?.title);
  } else defaultValue = "";

  return (
    <div className="flex items-center">
      <input
        onChange={(e) => updateParent(id, e.target.value)}
        type="text"
        className="block dark:placeholder-mediumgrey dark:bg-verydarkgrey rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        defaultValue={defaultValue!}
        placeholder="Ex. Make Coffee"
      />
      <div className="pl-4 flex items-center justify-center">
        <XButton />
      </div>
    </div>
  );
};
