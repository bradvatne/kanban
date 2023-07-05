export type Board = {
  id: number;
  title: string | null;
};

export type Boards = { [key: number]: Board };

export type Column = {
  id: number;
  boardid: number | null;
  title: string | null;
  color: string | null;
};

export type Columns = { [key: number]: Column };

export type Task = {
  id: number;
  columnid: number;
  title: string;
  description: string | null;
};

export type Tasks = { [key: number]: Task };

export type Subtask = {
  id: number;
  taskid: number;
  title: string;
  complete: boolean;
};

export type Subtasks = { [key: number]: Subtask };
