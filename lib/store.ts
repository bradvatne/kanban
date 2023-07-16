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
  State,
} from "@/types/types";

export const useStore = create<State>((set) => ({
  currentBoard: undefined,
  currentTask: undefined,
  showViewTaskModal: false,
  showEditTaskModal: false,
  showAddTaskModal: false,
  showLeftDrawer: true,
  showBoardModal: false,
  showEditBoardMenu: false,
  showEditBoardModal: false,
  boards: {},
  columns: {},
  tasks: {},
  subtasks: {},
  closeModals: () =>
    set(() => ({
      showViewTaskModal: false,
      showBoardModal: false,
      showEditBoardModal: false,
      showEditTaskModal: false,
      showAddTaskModal: false,
      showEditBoardMenu: false,
    })),
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
  setShowViewTaskModal: (bool: boolean) =>
    set(() => ({ showViewTaskModal: bool })),
  setShowEditTaskModal: (bool: boolean) =>
    set(() => ({ showEditTaskModal: bool })),
  setShowAddTaskModal: (bool: boolean) =>
    set(() => ({ showAddTaskModal: bool })),
  setShowBoardModal: (bool: boolean) => set(() => ({ showBoardModal: bool })),
  setShowEditBoardMenu: (bool: boolean) =>
    set(() => ({ showEditBoardMenu: bool })),
  setShowEditBoardModal: (bool: boolean) =>
    set(() => ({ showEditBoardModal: bool })),
  setShowLeftDrawer: (bool: boolean) => set(() => ({ showLeftDrawer: bool })),
  setBoards: (boards: Boards) => set(() => ({ boards })),
  setColumns: (columns: Columns) => set(() => ({ columns })),
  setTasks: (tasks: Tasks) => set(() => ({ tasks })),
  setSubtasks: (subtasks: Subtasks) => set(() => ({ subtasks })),
  setCurrentBoard: (id: number | undefined) =>
    set(() => ({ currentBoard: id })),
  setCurrentTask: (id: number | undefined) => set(() => ({ currentTask: id })),
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
