import { Board, Column, State, Subtask, Task } from "@/types/types";
import { create } from "zustand";
import { Draft, produce } from "immer";

export interface IActionSlice {
  addBoard: (board: Board) => void;
  addColumn: (column: Column) => void;
  addTask: (task: Task) => void;
  addSubtask: (subtask: Subtask) => void;
  removeTask: (id: number) => void;
  removeSubtask: (id: number) => void;
  removeBoard: (id: number) => void;
  removeColumn: (id: number) => void;
}

export const createActionSlice = (set: any) => ({
  removeBoard: (id: number) => {
    set(
      produce((draft: Draft<State>) => {
        delete draft.boards[id];
      })
    );
  },
  removeColumn: (id: number) => {
    set(
      produce((draft: Draft<State>) => {
        delete draft.columns[id];
      })
    );
  },
  removeTask: (id: number) => {
    set(
      produce((draft: Draft<State>) => {
        delete draft.tasks[id];
      })
    );
  },
  addBoard: (board: Board) => {
    console.log(`adding ${board}`);
    set(
      produce((draft: Draft<State>) => {
        draft.boards[board.id] = board;
      })
    );
  },
  addColumn: (column: Column) => {
    set(
      produce((draft: Draft<State>) => {
        draft.columns[column.id] = column;
      })
    );
  },
  addTask: (task: Task) => {
    set(
      produce((draft: Draft<State>) => {
        draft.tasks[task.id] = task;
      })
    );
  },
  addSubtask: (subtask: Subtask) => {
    set(
      produce((draft: Draft<State>) => {
        draft.subtasks[subtask.id] = subtask;
      })
    );
  },
  removeSubtask: (subtaskId: number) => {
    set(
      produce((draft: Draft<State>) => {
        delete draft.subtasks[subtaskId];
      })
    );
  },
});
