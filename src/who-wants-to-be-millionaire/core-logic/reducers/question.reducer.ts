import { AppState } from "../../store/appState.ts";
import { AnyAction } from "@reduxjs/toolkit";

export const questionReducer = (
  state: AppState["question"] = null,
  action: AnyAction,
) => {
  if (action.type === "question/retrieved") return action.payload;
  return state;
};
