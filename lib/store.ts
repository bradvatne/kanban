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
  boardModal: {
    visible: boolean;
    boardData: BoardRow | undefined;
  };
  setBoardModal: (boardModal: {
    visible: boolean;
    boardData: BoardRow | undefined;
  }) => void;
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
  boardModal: {
    visible: false,
    boardData: undefined,
  },
  setBoardModal: (boardModal: {
    visible: boolean;
    boardData: BoardRow | undefined;
  }) => set(() => ({ boardModal })),
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
