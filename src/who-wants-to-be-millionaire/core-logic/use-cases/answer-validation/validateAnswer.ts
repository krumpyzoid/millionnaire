import { AppThunk, ReduxStore } from "../../../store/reduxStore.ts";
import { QuestionGateway } from "../../gateways/questionGateway.ts";
import { createAction } from "@reduxjs/toolkit";
import { ValidatedAnswer } from "./validatedAnswer.ts";
import { AnswerLetter } from "../../../store/appState.ts";

export const answerValidatedAction =
	createAction<ValidatedAnswer>("answer/validated");

export const validateAnswer =
	(answer: AnswerLetter): AppThunk<Promise<void>> =>
	async (
		dispatch: ReduxStore["dispatch"],
		getState,
		{ questionGateway }: { questionGateway: QuestionGateway }
	) => {
		const answerAlreadyValidated = !!getState().answerValidation;
		const answerIsDisabled =
			getState().question?.id === getState().removedAnswers?.questionId &&
			getState().removedAnswers?.removedAnswers.includes(answer);

		if (answerAlreadyValidated || answerIsDisabled) return;

		dispatch(
			answerValidatedAction(
				await questionGateway.validateAnswer(
					getState().question!.id,
					answer
				)
			)
		);
	};
