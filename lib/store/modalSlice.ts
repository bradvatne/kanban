import { create } from "zustand";

export interface IModalSlice {
  showLeftDrawer: boolean;
  showViewTaskModal: boolean;
  showEditTaskModal: boolean;
  showAddTaskModal: boolean;
  showBoardModal: boolean;
  showEditBoardMenu: boolean;
  showEditBoardModal: boolean;
  setShowLeftDrawer: (bool: boolean) => void;
  setShowDeleteModal: ({ type, id }: { type: string; id: number }) => void;
  setShowViewTaskModal: (bool: boolean) => void;
  setShowEditTaskModal: (bool: boolean) => void;
  setShowAddTaskModal: (bool: boolean) => void;
  setShowBoardModal: (bool: boolean) => void;
  setShowEditBoardMenu: (bool: boolean) => void;
  setShowEditBoardModal: (bool: boolean) => void;
  closeModals: () => void;
}

export const createModalSlice = (set: any): IModalSlice => ({
  showLeftDrawer: true,
  showViewTaskModal: false,
  showEditTaskModal: false,
  showAddTaskModal: false,
  showBoardModal: false,
  showEditBoardMenu: false,
  showEditBoardModal: false,
  setShowLeftDrawer: (bool: boolean) => set(() => ({ showLeftDrawer: bool })),
  setShowDeleteModal: ({ type, id }: { type: string; id: number }) =>
    set((state: any) => ({ ...state, deleteModal: { type, id } })),
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
  closeModals: () =>
    set(() => ({
      showViewTaskModal: false,
      showBoardModal: false,
      showEditBoardModal: false,
      showEditTaskModal: false,
      showAddTaskModal: false,
      showEditBoardMenu: false,
    })),
});
