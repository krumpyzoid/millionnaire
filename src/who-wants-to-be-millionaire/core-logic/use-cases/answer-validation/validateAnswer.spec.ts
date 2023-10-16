import { QuestionGatewayStub } from "../gateways/questionGatewayStub.ts";
import { initReduxStore, ReduxStore } from "../../../store/reduxStore.ts";
import { validateAnswer } from "./validateAnswer.ts";
import { Question } from "../question-retrieval/question.ts";
import { retrieveQuestion } from "../question-retrieval/retrieveQuestion.ts";

describe("Question retrieval", () => {
	let questionGateway: QuestionGatewayStub;
	let store: ReduxStore;

	beforeEach(() => {
		questionGateway = new QuestionGatewayStub();
		store = initReduxStore();
	});

	it("should retrieve a new question", async () => {
		questionGateway.question = aQuestion;
		await store.dispatch(retrieveQuestion(questionGateway));
		await store.dispatch(validateAnswer(questionGateway, "123abc", "A"));
		expect(store.getState()).toEqual({
			question: aQuestion,
			answerValidation: {
				id: "123abc",
				answer: "B",
				given: "A",
			},
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
