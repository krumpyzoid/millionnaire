import { AppState } from "../../store/appState.ts";
import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { retrievedQuestion } from "../use-cases/question-retrieval/retrieveQuestion.ts";

export const questionReducerferf = (
  state: AppState["question"] = null,
  action: AnyAction,
) => {
  if (action.type === "question/retrieved") return action.payload;
  return state;
};

export const questionReducer = createReducer<AppState["question"]>(
  null,
  (builder) => {
    builder.addCase(retrievedQuestion, (_, action) => action.payload);
  },
);
