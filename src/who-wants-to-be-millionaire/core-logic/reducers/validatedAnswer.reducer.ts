import { AppState } from "../../store/appState.ts";
import { AnyAction } from "@reduxjs/toolkit";

export const validatedAnswerReducer = (
	state: AppState["answerValidation"] = null,
	action: AnyAction
) => {
	if (action.type === "answer/validate") return action.payload;
	return state;
};
