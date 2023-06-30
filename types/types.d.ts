export type Board = {
  id: number;
  title: string;
};

export type Boards = { [key: number]: Board };

export type Column = {
  id: number;
  boardId: number;
  title: string;
  color: string;
};

export type Columns = { [key: number]: Column };

export type Task = {
  id: number;
  columnId: number;
  title: string;
  description: string | null;
};

export type Tasks = { [key: number]: Task };

export type Subtask = {
  id: number;
  taskId: number;
  title: string;
  complete: boolean;
};

export type Subtasks = { [key: number]: Subtask };
