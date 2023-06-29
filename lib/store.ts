import { BoardRow, ColumnsRow, SubtaskRow, TaskRow } from "@/types/supabase";
import { create } from "zustand";
import { produce } from "immer";

type ModalType = "VIEW" | "ADD" | "EDIT";

export interface State {
  currentBoard: BoardRow | undefined;
  boards: BoardRow[];
  columns: ColumnsRow[];
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
  toggleSubtaskStatus: (subtaskId: number) => void;
  setBoardModal: (boardModal: {
    visible: boolean;
    boardData: BoardRow | undefined;
  }) => void;
  setBoards: (boards: BoardRow[]) => void;
  setColumns: (columns: ColumnsRow[]) => void;
  setIsLeftDrawerVisible: () => void;
  setCurrentBoard: (board: BoardRow) => void;
  setTaskModal: ({
    taskData,
    type,
    visible,
  }: {
    taskData: TaskRow;
    type: ModalType;
    visible: boolean;
  }) => void;
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
  toggleSubtaskStatus: (subtaskId: number) =>
    set((state) => {
      return produce(state, (draftState) => {
        const { boards } = draftState;

        for (const board of boards) {
          for (const column of board.Columns) {
            for (const task of column.task) {
              const subtask = task.subtask.find(
                (subtask) => subtask.id === subtaskId
              );

              if (subtask) {
                subtask.complete = !subtask.complete;
                break;
              }
            }

            if (subtaskId) {
              break;
            }
          }

          if (subtaskId) {
            break;
          }
        }
      });
    }),
  setBoardModal: (boardModal: {
    visible: boolean;
    boardData: BoardRow | undefined;
  }) => set(() => ({ boardModal })),
  setBoards: (boards: BoardRow[]) => set(() => ({ boards })),
  setColumns: (columns: ColumnsRow[]) => set(() => ({ columns })),
  setIsLeftDrawerVisible: () =>
    set((state) => ({ isLeftDrawerVisible: !state.isLeftDrawerVisible })),
  setCurrentBoard: (board: BoardRow) => set(() => ({ currentBoard: board })),
  setTaskModal: ({
    taskData,
    type,
    visible,
  }: {
    taskData: TaskRow;
    type: ModalType;
    visible: boolean;
  }) =>
    set(() => ({
      taskModal: {
        visible,
        type,
        taskData,
      },
    })),
}));
