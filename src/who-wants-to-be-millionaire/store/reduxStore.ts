import {
  Action,
  AnyAction,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppState } from "./appState";
import { questionReducer } from "../core-logic/reducers/question.reducer.ts";
import { validatedAnswerReducer } from "../core-logic/reducers/validatedAnswer.reducer.ts";
import { QuestionGateway } from "../core-logic/gateways/questionGateway.ts";

export interface Dependencies {
  questionGateway: QuestionGateway;
}

export const initReduxStore = (dependencies: Partial<Dependencies>) => {
  return configureStore({
    reducer: {
      question: questionReducer,
      answerValidation: validatedAnswerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
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
