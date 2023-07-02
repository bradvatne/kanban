import { create } from "zustand";
import { produce } from "immer";
import {
  Boards,
  Column,
  Columns,
  Subtask,
  Subtasks,
  Task,
  Tasks,
} from "@/types/types";

export type State = {
  currentBoard: number | undefined;
  showTaskModal: boolean;
  showLeftDrawer: boolean;
  showBoardModal: boolean;
  boards: Boards;
  columns: Columns;
  tasks: Tasks;
  subtasks: Subtasks;
  toggleSubtaskComplete: (subtaskId: number) => void;
  setShowTaskModal: (bool: boolean) => void;
  setBoards: (boards: Boards) => void;
  setColumns: (columns: Columns) => void;
  setTasks: (tasks: Tasks) => void;
  setSubtasks: (subtasks: Subtasks) => void;
  addTask: (task: Task) => void;
  addSubtask: (subtask: Subtask) => void;
  removeTask: (id: number) => void;
  getTaskById: (id: number) => (state: State) => Task;
  getColumnById: (id: number) => (state: State) => Column;
  getSubtaskById: (id: number) => (state: State) => Subtask;
  setCurrentBoard: (id: number) => void;
};

export const useStore = create<State>((set) => ({
  currentBoard: undefined,
  showTaskModal: false,
  showLeftDrawer: true,
  showBoardModal: false,
  boards: {},
  columns: {},
  tasks: {},
  subtasks: {},
  toggleSubtaskComplete: (subtaskId: number) =>
    set(
      produce((draft) => {
        const subtask = draft.subtasks[subtaskId];
        if (subtask) {
          subtask.complete = !subtask.complete;
        }
      })
    ),
  setShowTaskModal: (bool: boolean) => set(() => ({ showTaskModal: bool })),
  setBoards: (boards: Boards) => set(() => ({ boards })),
  setColumns: (columns: Columns) => set(() => ({ columns })),
  setTasks: (tasks: Tasks) => set(() => ({ tasks })),
  setSubtasks: (subtasks: Subtasks) => set(() => ({ subtasks })),
  setCurrentBoard: (id: number) => set(() => ({ currentBoard: id })),
  removeTask: (id: number) => {
    set(
      produce((draft) => {
        delete draft.tasks[id];
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
  addSubtask: (subtask: Subtask) =>
    set((state) => ({
      ...state.subtasks,
      [subtask.id]: subtask,
    })),
  getBoardById: (id: number) => (state: State) => state.boards[id],
  getColumnById: (id: number) => (state: State) => state.columns[id],
  getTaskById: (id: number) => (state: State) => state.tasks[id],
  getSubtaskById: (id: number) => (state: State) => state.subtasks[id],
}));
