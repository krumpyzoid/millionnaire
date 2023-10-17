import { AppState } from "../../store/appState.ts";
import { createReducer } from "@reduxjs/toolkit";
import { retrievedQuestionAction } from "../use-cases/question-retrieval/retrieveQuestion.ts";

export const questionReducer = createReducer<AppState["question"]>(
  null,
  (builder) => {
    builder.addCase(retrievedQuestionAction, (_, action) => action.payload);
  },
);
