import { XButton } from "./XButton";

export const ColumnInput = ({
  setColumns,
  id,
}: {
  setColumns: Function;
  id: number;
}) => {
  const updateParent = (newValue: string) => {
    setColumns((state: string[]) => {});
  };

  return (
    <div className="flex items-center">
      <input
        onChange={(e) => {}}
        type="text"
        className="block dark:placeholder-mediumgrey dark:bg-verydarkgrey rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        placeholder="Ex. Make Coffee"
      />
      <div className="pl-4 flex items-center justify-center">
        <XButton />
      </div>
    </div>
  );
};
