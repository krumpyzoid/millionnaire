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

export const initReduxStore = () => {
	return configureStore({
		reducer: {
			question: questionReducer,
			answerValidation: validatedAnswerReducer,
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
