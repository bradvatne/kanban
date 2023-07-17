import { create } from "zustand";
import { IModalSlice, createModalSlice } from "./store/modalSlice";
import { IActionSlice, createActionSlice } from "./store/actionSlice";
import { IDataSlice, createDataSlice } from "./store/dataSlice";

type State = IModalSlice & IActionSlice & IDataSlice;

export const useStore = create<State>()((set, get) => ({
  ...createModalSlice(set),
  ...createActionSlice(set),
  ...createDataSlice(set, get),
}));
