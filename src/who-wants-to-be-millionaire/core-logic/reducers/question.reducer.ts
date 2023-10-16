import { AppState } from "../../store/appState.ts";
import { createReducer } from "@reduxjs/toolkit";
import { retrievedQuestion } from "../use-cases/question-retrieval/retrieveQuestion.ts";

export const questionReducer = createReducer<AppState["question"]>(
  null,
  (builder) => {
    builder.addCase(retrievedQuestion, (_, action) => action.payload);
  },
);
