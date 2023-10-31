import { QuestionGatewayStub } from "../../../adapters/secondary/gateways/questionGatewayStub";
import { AppState, Question } from "../../../store/appState";
import { ReduxStore, initReduxStore } from "../../../store/reduxStore";
import { validateAnswer } from "../answer-validation/validateAnswer";
import { retrievedQuestionAction } from "../question-retrieval/retrieveQuestion";
import { removeTwoAnswers, removedTwoAnswersAction } from "./removeTwoAnswers";

describe("Joker to remove 2 false answers", () => {
	let store: ReduxStore;
	let questionGateway: QuestionGatewayStub;
	let initialState: AppState;

	beforeEach(async () => {
		questionGateway = new QuestionGatewayStub();
		questionGateway.question = aQuestion;
		questionGateway.correctAnswer = { "123abc": "B" };

		store = initReduxStore({
			dependencies: { questionGateway },
		});
		initialState = store.getState();
		store.dispatch(retrievedQuestionAction(aQuestion));
	});

	describe("Before the FiftyFifty joker is used", () => {
		it("Should start as null", () => {
			expect(store.getState().removedAnswers).toEqual(null);
		});
	});

	describe("Using the FiftyFifty joker", () => {
		it("Should select two answers to disable when a user uses FiftyFifty", async () => {
			await store.dispatch(removeTwoAnswers());
			expect(store.getState().removedAnswers).toEqual({
				questionId: "123abc",
				removedAnswers: ["A", "C"],
			});
		});
		it("Trying to use FiftyFifty a second time will not have any effect on game state", async () => {
			store.dispatch(
				removedTwoAnswersAction({
					questionId: "123abc",
					removedAnswers: ["A", "C"],
				})
			);
			initialState = store.getState();

			await store.dispatch(removeTwoAnswers());

			expect(store.getState()).toBe(initialState);
		});
		it("User cannot select an answer that has been disabled", async () => {
			store.dispatch(
				removedTwoAnswersAction({
					questionId: "123abc",
					removedAnswers: ["A", "C"],
				})
			);
			initialState = store.getState();

			await store.dispatch(validateAnswer("A"));

			expect(store.getState()).toBe(initialState);
		});
	});

	const aQuestion: Question = {
		id: "123abc",
		label: "What is the answer to life, the universe and everything?",
		possibleAnswers: {
			A: "42",
			B: "24",
			C: "404",
			D: "666",
		},
	};
});
