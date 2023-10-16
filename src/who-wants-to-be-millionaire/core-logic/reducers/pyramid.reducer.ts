import { AppState, Pyramid } from "../../store/appState.ts";
import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { answerValidatedAction } from "../use-cases/answer-validation/validateAnswer.ts";

const ladder = (ladder: Pyramid["ladder"]) =>
  createReducer<AppState["pyramid"]["ladder"]>(ladder, () => {});

const currentLevel = createReducer<AppState["pyramid"]["currentLevel"]>(
  0,
  (builder) => {
    builder.addCase(answerValidatedAction, (state, action) => {
      if (action.payload.correct === action.payload.given) return state + 1;
      return 0;
    });
  },
);

export const pyramidReducer = (ladderParam: Pyramid["ladder"]) =>
  combineReducers({
    ladder: ladder(ladderParam),
    currentLevel,
  });
