import { BoardRow, TaskRow } from "@/types/supabase";
import { create } from "zustand";

type ModalType = "VIEW" | "ADD" | "EDIT";

interface State {
  currentBoard: string | undefined;
  boards: BoardRow[];
  taskModal: {
    visible: boolean;
    type: ModalType;
    taskData: TaskRow | undefined;
  };
  isLeftDrawerVisible: boolean;
  setBoards: (boards: BoardRow[]) => void;
  setIsLeftDrawerVisible: () => void;
  setCurrentBoard: (board: BoardRow) => void;
  setTaskModal: (task: TaskRow, type: ModalType, visible: boolean) => void;
}

// Define your store
export const useLayoutStore = create<State>((set) => ({
  currentBoard: "Platform Launch",
  boards: [],
  taskModal: { visible: false, type: "VIEW", taskData: undefined },
  isLeftDrawerVisible: true,
  setBoards: (boards: BoardRow[]) => set(() => ({ boards })),
  setIsLeftDrawerVisible: () =>
    set((state) => ({ isLeftDrawerVisible: !state.isLeftDrawerVisible })),
  setCurrentBoard: (board: BoardRow) =>
    set(() => ({ currentBoard: board.title! })),
  setTaskModal: (taskData: TaskRow, type: ModalType, visible: boolean) =>
    set(() => ({
      taskModal: {
        visible,
        type,
        taskData,
      },
    })),
}));
