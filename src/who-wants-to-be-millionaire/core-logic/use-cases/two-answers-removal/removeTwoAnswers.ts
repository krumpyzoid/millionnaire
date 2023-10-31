import { AppThunk, ReduxStore } from "../../../store/reduxStore.ts";
import { createAction } from "@reduxjs/toolkit";
import { RemovedAnswers } from "../../../store/appState.ts";
import { QuestionGateway } from "../../gateways/questionGateway.ts";

export const removedTwoAnswersAction = createAction<RemovedAnswers>(
	"joker/removedTwoAnswers"
);

export const removeTwoAnswers =
	(): AppThunk<Promise<void>> =>
	async (
		dispatch: ReduxStore["dispatch"],
		getState,
		{ questionGateway }: { questionGateway: QuestionGateway }
	) => {
		if (getState().removedAnswers) return;
		dispatch(
			removedTwoAnswersAction(
				await questionGateway.getTwoFalseAnswers(
					getState().question!.id
				)
			)
		);
	};
