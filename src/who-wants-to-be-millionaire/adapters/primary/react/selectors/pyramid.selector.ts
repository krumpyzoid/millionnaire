import { AppState } from "../../../../store/appState.ts";

export type PyramidVM = {
  ladder: string[];
  currentLevel: number;
};

export const selectPyramid = (state: AppState): PyramidVM => {
  const pyramidLadderLength = state.pyramid.ladder.length - 1;
  return {
    ladder: [...state.pyramid.ladder]
      .reverse()
      .map((s) => s.toLocaleString("fr-FR")),
    currentLevel: pyramidLadderLength - state.pyramid.currentLevel,
  };
};
