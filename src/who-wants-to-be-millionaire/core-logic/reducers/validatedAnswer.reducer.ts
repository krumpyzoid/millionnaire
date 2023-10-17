import { AppState } from "../../store/appState.ts";
import { createReducer } from "@reduxjs/toolkit";
import { answerValidatedAction } from "../use-cases/answer-validation/validateAnswer.ts";
import { retrievedQuestionAction } from "../use-cases/question-retrieval/retrieveQuestion.ts";

export const validatedAnswerReducer = createReducer<
  AppState["answerValidation"]
>(null, (builder) => {
  builder.addCase(answerValidatedAction, (_, action) => action.payload);
  builder.addCase(retrievedQuestionAction, () => null);
});
