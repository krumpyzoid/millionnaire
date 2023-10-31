import {
	AnswerLetter,
	AnswerValidation,
	AppState,
	RemovedAnswers,
} from "../../../../store/appState.ts";

export type PossibleAnswerVM = {
	id: string;
	label: string;
	possibleAnswers: Record<AnswerLetter, AnswerVM>;
} | null;

export type AnswerVM = {
	label: string;
	status: AnswerStatus;
	disabled: boolean;
};

export type AnswerStatus = "NONE" | "CORRECT" | "WRONG";

export const selectPossibleAnswers = (state: AppState) => {
	if (!state.question) return null;

	const showHighlightedAnswerStatus = (
		answerValidation: AnswerValidation,
		letter: AnswerLetter
	) => {
		const { given, correct } = answerValidation!;
		if (correct === letter) return "CORRECT";
		if (given === letter) return "WRONG";
		return "NONE";
	};

	const showAnswerDisabledStatus = (
		removedAnswers: RemovedAnswers,
		letter: AnswerLetter
	) => {
		if (!removedAnswers) return false;
		return removedAnswers.removedAnswers.includes(letter);
	};

	const possibleAnswers = Object.entries(
		state.question.possibleAnswers
	).reduce(
		(acc, [letter, label]) => {
			return {
				...acc,
				[letter as AnswerLetter]: {
					label: label as AnswerLetter,
					status: state.answerValidation
						? showHighlightedAnswerStatus(
								state.answerValidation,
								letter as AnswerLetter
								/* eslint-disable-next-line no-mixed-spaces-and-tabs */
						  )
						: "NONE",
					disabled: showAnswerDisabledStatus(
						state.removedAnswers,
						letter as AnswerLetter
					),
				},
			};
		},
		{} as Record<AnswerLetter, AnswerVM>
	);

	return {
		id: state.question.id,
		label: state.question.label,
		possibleAnswers,
	};
};
