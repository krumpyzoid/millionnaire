import { AppState } from "../../store/appState.ts";
import { createReducer } from "@reduxjs/toolkit";
import { removedTwoAnswersAction } from "../use-cases/two-answers-removal/removeTwoAnswers.ts";

export const removedAnswersReducer = createReducer<AppState["removedAnswers"]>(
	null,
	(builder) => {
		builder.addCase(removedTwoAnswersAction, (_, action) => action.payload);
	}
);
