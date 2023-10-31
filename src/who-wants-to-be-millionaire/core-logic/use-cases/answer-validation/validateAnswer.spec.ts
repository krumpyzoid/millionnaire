import { initReduxStore, ReduxStore } from "../../../store/reduxStore.ts";
import { answerValidatedAction, validateAnswer } from "./validateAnswer.ts";
import { AppState, Question } from "../../../store/appState.ts";
import { QuestionGatewayStub } from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import { retrievedQuestionAction } from "../question-retrieval/retrieveQuestion.ts";

describe("Answer validation", () => {
	let questionGateway: QuestionGatewayStub;
	let store: ReduxStore;
	let initialState: AppState;

	beforeEach(() => {
		questionGateway = new QuestionGatewayStub();
		store = initReduxStore({ dependencies: { questionGateway } });
		initialState = store.getState();
	});

	it("should validate an answer", async () => {
		// GIVEN
		store.dispatch(retrievedQuestionAction(aQuestion));
		initialState = store.getState();
		questionGateway.correctAnswer = { "123abc": "B" };

		// WHEN
		await store.dispatch(validateAnswer("A"));

		// THEN
		expect(store.getState()).toEqual<AppState>({
			...initialState,
			pyramid: store.getState().pyramid,
			answerValidation: {
				correct: "B",
				given: "A",
			},
		});
	});

	it("should not validate a same question more than once", async () => {
		// GIVEN
		questionGateway.correctAnswer = { "123abc": "B" };
		store.dispatch(retrievedQuestionAction(aQuestion));
		store.dispatch(answerValidatedAction({ given: "B", correct: "B" }));
		initialState = store.getState();

		// WHEN
		await store.dispatch(validateAnswer("B"));

		// THEN
		expect(store.getState()).toEqual(initialState);
	});

	it("should reset the old validation when a next question is retrieved", () => {
		store.dispatch(answerValidatedAction({ given: "A", correct: "A" }));
		store.dispatch(retrievedQuestionAction(aQuestion));
		expect(store.getState().answerValidation).toEqual(null);
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
