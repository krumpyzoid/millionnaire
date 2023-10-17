import { AppState } from "../../../../store/appState.ts";

export type PyramidVM = {
  ladder: string[];
  currentLevel: number;
};

export const selectPyramidSelector = (state: AppState): PyramidVM => {};
