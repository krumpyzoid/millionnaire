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

export interface Dependencies {
  questionGateway: QuestionGateway;
}

export const initReduxStore = (options: {
  pyramidLadder?: Pyramid["ladder"];
  dependencies?: Dependencies;
}) => {
  const mergeOptions = {
    ...options,
    pyramidLadder: options.pyramidLadder || [0, 200, 500, 3000],
  };
  return configureStore({
    reducer: {
      question: questionReducer,
      answerValidation: validatedAnswerReducer,
      pyramid: pyramidReducer(mergeOptions.pyramidLadder),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: mergeOptions.dependencies,
        },
      }),
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
