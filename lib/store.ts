import {create} from 'zustand';

type Board = {
  id: number;
  title: string | null;
  userid: string | null;
  columnIds: number[];
};

type Column = {
  id: number;
  title: string | null;
  boardId: number | null;
  color: string | null;
  taskIds: number[];
};

type Task = {
  id: number;
  title: string | null;
  columnId: number | null;
  subtaskIds: number[];
};

type Subtask = {
  id: number;
  title: string;
  complete: boolean;
  taskId: number;
};

// Define your store
const useBoardStore = create<Record<number, Board>>((set) => ({
  setBoards: (boards: Board[]) => {
    const boardsObj: Record<number, Board> = boards.reduce(
      (obj, board) => ({
        ...obj,
        [board.id]: board,
      }),
      {}
    );
    set(boardsObj);
  },
}));

const useColumnStore = create<Record<number, Column>>(set => set({}));
const useTaskStore = create<Record<number, Task>>(set => set({}));
const useSubtaskStore = create<Record<number, Subtask>>(set => set({}));

