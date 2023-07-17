import {
  Board,
  Boards,
  Column,
  Columns,
  Subtask,
  Subtasks,
  Task,
  Tasks,
} from "@/types/types";

export interface IDataSlice {
  boards: Boards;
  columns: Columns;
  tasks: Tasks;
  subtasks: Subtasks;
  currentBoard: number | undefined;
  currentTask: number | undefined;
  setBoards: (boards: Boards) => void;
  setColumns: (columns: Columns) => void;
  setTasks: (tasks: Tasks) => void;
  setSubtasks: (subtasks: Subtasks) => void;
  setCurrentBoard: (id: number | undefined) => void;
  setCurrentTask: (id: number | undefined) => void;
  getBoardById: (id: number) => Board;
  getTaskById: (id: number) => Task;
  getColumnById: (id: number) => Column;
  getSubtaskById: (id: number) => Subtask;
}

export const createDataSlice = (set: any, get: any) => ({
  boards: {},
  columns: {},
  tasks: {},
  subtasks: {},
  currentBoard: undefined,
  currentTask: undefined,
  setBoards: (boards: Boards) => set(() => ({ boards })),
  setColumns: (columns: Columns) => set(() => ({ columns })),
  setTasks: (tasks: Tasks) => set(() => ({ tasks })),
  setSubtasks: (subtasks: Subtasks) => set(() => ({ subtasks })),
  setCurrentBoard: (id: number | undefined) =>
    set(() => ({ currentBoard: id })),
  setCurrentTask: (id: number | undefined) => set(() => ({ currentTask: id })),
  getBoardById: (id: number) => get().boards[id],
  getColumnById: (id: number) => get().columns[id],
  getTaskById: (id: number) => get().tasks[id],
  getSubtaskById: (id: number) => get().subtasks[id],
});
