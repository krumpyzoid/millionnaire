import {
	AnswerStatus,
	PossibleAnswerVM,
	selectPossibleAnswers,
} from "./possibleAnswers.selector.ts";
import { initReduxStore, ReduxStore } from "../../../../store/reduxStore.ts";
import { AnswerLetter, Question } from "../../../../store/appState.ts";
import { retrievedQuestionAction } from "../../../../core-logic/use-cases/question-retrieval/retrieveQuestion.ts";
import { answerValidatedAction } from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import { removedTwoAnswersAction } from "../../../../core-logic/use-cases/two-answers-removal/removeTwoAnswers.ts";

describe("Possible answers selector", () => {
	let store: ReduxStore;

	beforeEach(() => {
		store = initReduxStore({});
	});

	describe("Before retrieving the question", () => {
		it("should not show any answer", () => {
			expect(
				selectPossibleAnswers(store.getState())
			).toEqual<PossibleAnswerVM>(null);
		});
	});

	describe("After retrieving the question", () => {
		beforeEach(() => {
			store.dispatch(retrievedQuestionAction(aQuestion));
		});

		describe("Before validating an answer", () => {
			it("should not show any answer", () => {
				expectAnswerWithStatuses(
					{
						A: "NONE",
						B: "NONE",
						C: "NONE",
						D: "NONE",
					},
					{
						A: false,
						B: false,
						C: false,
						D: false,
					}
				);
			});
		});

		describe("After activating FiftyFifty joker", () => {
			it("should show the question with two answers disabled", () => {
				store.dispatch(
					removedTwoAnswersAction({
						questionId: "123abc",
						removedAnswers: ["A", "C"],
					})
				);
				expectAnswerWithStatuses(
					{
						A: "NONE",
						B: "NONE",
						C: "NONE",
						D: "NONE",
					},
					{
						A: true,
						B: false,
						C: true,
						D: false,
					}
				);
			});
		});

		describe("After validating an answer", () => {
			it.each`
				given  | correct | expectedStatusA | expectedStatusB | expectedStatusC | expectedStatusD
				${"B"} | ${"B"}  | ${"NONE"}       | ${"CORRECT"}    | ${"NONE"}       | ${"NONE"}
				${"D"} | ${"D"}  | ${"NONE"}       | ${"NONE"}       | ${"NONE"}       | ${"CORRECT"}
				${"D"} | ${"D"}  | ${"NONE"}       | ${"NONE"}       | ${"NONE"}       | ${"CORRECT"}
				${"A"} | ${"D"}  | ${"WRONG"}      | ${"NONE"}       | ${"NONE"}       | ${"CORRECT"}
			`(
				"should show the corresponding statuses for the answer when correct was $correct and given was $given",
				({
					given,
					correct,
					expectedStatusA,
					expectedStatusB,
					expectedStatusC,
					expectedStatusD,
				}) => {
					store.dispatch(
						answerValidatedAction({
							given,
							correct,
						})
					);
					expectAnswerWithStatuses(
						{
							A: expectedStatusA,
							B: expectedStatusB,
							C: expectedStatusC,
							D: expectedStatusD,
						},
						{
							A: false,
							B: false,
							C: false,
							D: false,
						}
					);
				}
			);
		});
	});

	const expectAnswerWithStatuses = (
		statuses: Record<AnswerLetter, AnswerStatus>,
		disabledStatuses: Record<AnswerLetter, boolean>
	) => {
		expect(
			selectPossibleAnswers(store.getState())
		).toEqual<PossibleAnswerVM>({
			id: "123abc",
			label: "A question",
			possibleAnswers: {
				A: {
					label: "A",
					status: statuses.A,
					disabled: disabledStatuses.A,
				},
				B: {
					label: "B",
					status: statuses.B,
					disabled: disabledStatuses.B,
				},
				C: {
					label: "C",
					status: statuses.C,
					disabled: disabledStatuses.C,
				},
				D: {
					label: "D",
					status: statuses.D,
					disabled: disabledStatuses.D,
				},
			},
		});
	};

	const aQuestion: Question = {
		id: "123abc",
		label: "A question",
		possibleAnswers: {
			A: "A",
			B: "B",
			C: "C",
			D: "D",
		},
	};
});
