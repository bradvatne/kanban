import { BoardRow, ColumnsRow, TaskRow } from "@/types/supabase";
import { create } from "zustand";

type ModalType = "VIEW" | "ADD" | "EDIT";
type TaskModalType = {
  visible: boolean;
  type: ModalType;
  taskData: TaskRow | undefined;
};
export interface State {
  currentBoard: BoardRow | undefined;
  boards: BoardRow[];
  columns: ColumnsRow[];
  taskModal: TaskModalType;
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
  setColumns: (columns: ColumnsRow[]) => void;
  setIsLeftDrawerVisible: () => void;
  setCurrentBoard: (board: BoardRow) => void;
  setTaskModal: (taskModal: TaskModalType) => void;
}

// Define your store
export const useStore = create<State>((set) => ({
  currentBoard: undefined,
  boards: [],
  columns: [],
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
  setColumns: (columns: ColumnsRow[]) => set(() => ({ columns })),
  setIsLeftDrawerVisible: () =>
    set((state) => ({ isLeftDrawerVisible: !state.isLeftDrawerVisible })),
  setCurrentBoard: (board: BoardRow) => set(() => ({ currentBoard: board })),
  setTaskModal: (taskData: TaskModalType) =>
    set(() => ({
      taskModal: taskData,
    })),
}));
