import { AppState } from "../../../../store/appState.ts";
import { createSelector } from "@reduxjs/toolkit";

export type PyramidVM = {
  ladder: string[];
  currentLevel: number;
};

export const selectPyramid = createSelector(
  (state: AppState) => state.pyramid,
  (pyramid): PyramidVM => {
    const pyramidLadderLength = pyramid.ladder.length - 1;
    return {
      ladder: [...pyramid.ladder]
        .reverse()
        .map((s) => s.toLocaleString("fr-FR")),
      currentLevel: pyramidLadderLength - pyramid.currentLevel,
    };
  },
);
