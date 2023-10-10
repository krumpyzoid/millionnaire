import {
  Action,
  AnyAction,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppState } from "./appState";

export const initReduxStore = () => {
  return configureStore({
    reducer: {
    },
    devTools: true,
  });
};

export type ReduxStore = Store<AppState> & {
  dispatch: ThunkDispatch<AppState, any, Action>;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  any,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<AppState, any, Action>;
