import { BoardRow, ColumnsRow, SubtaskRow, TaskRow } from "@/types/supabase";
import { create } from "zustand";
import { produce } from "immer";

export type ModalType = "VIEW" | "ADD" | "EDIT";
export type TaskModalType = {
  visible: boolean;
  type: ModalType;
  taskData: TaskRow | undefined;
};

export type BoardModalType = {
  visible: boolean;
  boardData: BoardRow | undefined;
};
export interface State {
  currentBoard: BoardRow | undefined;
  boards: BoardRow[];
  columns: ColumnsRow[];
  taskModal: TaskModalType;
  isLeftDrawerVisible: boolean;
  boardModal: BoardModalType;
  toggleSubtaskStatus: (subtaskId: number) => void;
  setBoardModal: (boardModal: BoardModalType) => void;
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
  toggleSubtaskStatus: (subtaskId) =>
    set((state) =>
      produce(state, (draftState) => {
        for (let board of draftState.boards) {
          for (let column of board.Columns) {
            for (let task of column.task) {
              for (let subtask of task.subtask) {
                if (subtask.id === subtaskId) {
                  console.log(
                    "changing",
                    subtask.complete,
                    "to",
                    !subtask.complete
                  );
                  subtask.complete = !subtask.complete;

                  return draftState; // Return updated state
                }
              }
            }
          }
        }
      })
    ),
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
