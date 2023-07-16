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
  position: string | null;
};

export type Tasks = { [key: number]: Task };

export type Subtask = {
  id: number;
  taskid: number;
  title: string;
  complete: boolean;
};

export type Subtasks = { [key: number]: Subtask };

export type State = {
  currentBoard: number | undefined;
  currentTask: number | undefined;
  showViewTaskModal: boolean;
  showLeftDrawer: boolean;
  showBoardModal: boolean;
  showEditBoardMenu: boolean;
  showEditBoardModal: boolean;
  showEditTaskModal: boolean;
  showAddTaskModal: boolean;
  boards: Boards;
  columns: Columns;
  tasks: Tasks;
  subtasks: Subtasks;
  closeModals: () => void;
  toggleSubtaskComplete: (subtaskId: number) => void;
  setShowViewTaskModal: (bool: boolean) => void;
  setShowEditTaskModal: (bool: boolean) => void;
  setShowAddTaskModal: (bool: boolean) => void;
  setShowBoardModal: (bool: boolean) => void;
  setShowEditBoardMenu: (bool: boolean) => void;
  setShowEditBoardModal: (bool: boolean) => void;
  setShowLeftDrawer: (bool: boolean) => void;
  setShowDeleteModal: ({ type, id }: { type: string; id: number }) => void;
  setBoards: (boards: Boards) => void;
  setColumns: (columns: Columns) => void;
  setTasks: (tasks: Tasks) => void;
  setSubtasks: (subtasks: Subtasks) => void;
  addBoard: (board: Board) => void;
  addColumn: (column: Column) => void;
  addTask: (task: Task) => void;
  addSubtask: (subtask: Subtask) => void;
  removeTask: (id: number) => void;
  removeSubtask: (id: number) => void;
  removeBoard: (id: number) => void;
  removeColumn: (id: number) => void;
  getBoardById: (id: number) => (state: State) => Board;
  getTaskById: (id: number) => (state: State) => Task;
  getColumnById: (id: number) => (state: State) => Column;
  getSubtaskById: (id: number) => (state: State) => Subtask;
  setCurrentBoard: (id: number | undefined) => void;
  setCurrentTask: (id: number | undefined) => void;
};
