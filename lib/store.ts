import { create } from "zustand";
import { produce } from "immer";
import {
  Board,
  Boards,
  Column,
  Columns,
  Subtask,
  Subtasks,
  Task,
  Tasks,
  State
} from "@/types/types";


export const useStore = create<State>((set) => ({
  currentBoard: undefined,
  showTaskModal: false,
  showLeftDrawer: true,
  showBoardModal: false,
  boards: {},
  columns: {},
  tasks: {},
  subtasks: {},
  toggleSubtaskComplete: (subtaskId) => {
    set(
      produce((draft) => {
        const subtask = draft.subtasks[subtaskId];
        if (subtask) {
          subtask.complete = !subtask.complete;
        }
      })
    );
  },
  setShowDeleteModal: ({ type, id }: { type: string; id: number }) => ({}),
  setShowTaskModal: (bool: boolean) => set(() => ({ showTaskModal: bool })),
  setShowBoardModal: (bool: boolean) => set(() => ({ showBoardModal: bool })),
  setShowLeftDrawer: (bool: boolean) => set(() => ({ showLeftDrawer: bool })),
  setBoards: (boards: Boards) => set(() => ({ boards })),
  setColumns: (columns: Columns) => set(() => ({ columns })),
  setTasks: (tasks: Tasks) => set(() => ({ tasks })),
  setSubtasks: (subtasks: Subtasks) => set(() => ({ subtasks })),
  setCurrentBoard: (id: number | undefined) =>
    set(() => ({ currentBoard: id })),
  removeBoard: (id: number) => {
    set(
      produce((draft) => {
        delete draft.boards[id];
      })
    );
  },
  removeColumn: (id: number) => {
    set(
      produce((draft) => {
        delete draft.columns[id];
      })
    );
  },
  removeTask: (id: number) => {
    set(
      produce((draft) => {
        delete draft.tasks[id];
      })
    );
  },
  addBoard: (board: Board) => {
    console.log(`adding ${board}`);
    set(
      produce((draft) => {
        draft.boards[board.id] = board;
      })
    );
  },
  addColumn: (column: Column) => {
    set(
      produce((draft) => {
        draft.columns[column.id] = column;
      })
    );
  },
  addTask: (task: Task) => {
    set(
      produce((draft) => {
        draft.tasks[task.id] = task;
      })
    );
  },
  addSubtask: (subtask: Subtask) => {
    set(
      produce((draft) => {
        draft.subtasks[subtask.id] = subtask;
      })
    );
  },
  removeSubtask: (subtaskId: number) => {
    set(
      produce((draft) => {
        delete draft.subtasks[subtaskId];
      })
    );
  },
  getBoardById: (id: number) => (state: State) => state.boards[id],
  getColumnById: (id: number) => (state: State) => state.columns[id],
  getTaskById: (id: number) => (state: State) => state.tasks[id],
  getSubtaskById: (id: number) => (state: State) => state.subtasks[id],
}));
