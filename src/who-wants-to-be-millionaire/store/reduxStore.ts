import {
  Action,
  AnyAction,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppState, Pyramid } from "./appState";
import { questionReducer } from "../core-logic/reducers/question.reducer.ts";
import { validatedAnswerReducer } from "../core-logic/reducers/validatedAnswer.reducer.ts";
import { QuestionGateway } from "../core-logic/gateways/questionGateway.ts";
import { pyramidReducer } from "../core-logic/reducers/pyramid.reducer.ts";
import { nextQuestionRetrieval } from "../core-logic/use-cases/next-question-retrieval/nextQuestionRetrieval.ts";

export interface Dependencies {
  questionGateway: QuestionGateway;
}

export const initReduxStore = (options: {
  pyramidLadder?: Pyramid["ladder"];
  dependencies?: Dependencies;
  enableListeners?: boolean;
}) => {
  const mergeOptions = {
    ...options,
    enableListeners: options.enableListeners ?? false,
    pyramidLadder: options.pyramidLadder || [0, 200, 500, 3000],
  };

  return configureStore({
    reducer: {
      question: questionReducer,
      answerValidation: validatedAnswerReducer,
      pyramid: pyramidReducer(mergeOptions.pyramidLadder),
    },
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        thunk: {
          extraArgument: mergeOptions.dependencies,
        },
      });
      if (mergeOptions.enableListeners)
        return middleware.prepend(nextQuestionRetrieval.middleware);
      return middleware;
    },
    devTools: true,
  });
};

export type ReduxStore = Store<AppState> & {
  dispatch: ThunkDispatch<AppState, Dependencies, Action>;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  Dependencies,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>;
