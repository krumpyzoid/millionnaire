import {
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { AppDispatch } from "../../../store/reduxStore.ts";
import { AppState } from "../../../store/appState.ts";
import { answerValidatedAction } from "../answer-validation/validateAnswer.ts";
import { retrieveQuestion } from "../question-retrieval/retrieveQuestion.ts";

export const nextQuestionRetrieval = createListenerMiddleware();

const listener = nextQuestionRetrieval.startListening as TypedStartListening<
  AppState,
  AppDispatch
>;

listener({
  actionCreator: answerValidatedAction,
  effect: (action, listenerApi) => {
    if (action.payload.given === action.payload.correct) {
      setTimeout(() => {
        listenerApi.dispatch(retrieveQuestion());
      }, 2000);
    }
  },
});
