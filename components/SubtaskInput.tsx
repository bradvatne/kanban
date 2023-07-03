import { XButton } from "./ui/XButton";

export const SubtaskInput = ({
  setSubtasks,
  id,
}: {
  setSubtasks: Function;
  id: number;
}) => {
  const updateParent = (parentId: number, newValue: string) => {
    setSubtasks((state: string[]) =>
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

  return (
    <div className="flex items-center">
      <input
        onChange={(e) => updateParent(id, e.target.value)}
        type="text"
        className="block rounded-md text-sm border-[#828FA340] w-full mt-2  focus:outline-none placeholder-black placeholder-opacity-25 focus:border-purple focus:ring-1 focus:ring-purplehover mb-3"
        id="subtask"
        placeholder="Ex. Make Coffee"
      />
      <div className="flex items-center justify-center pl-4 pb-4 hover:cursor-pointer h-full">
        <XButton />
      </div>
    </div>
  );
};
