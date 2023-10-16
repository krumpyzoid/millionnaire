import { initReduxStore, ReduxStore } from "../../../store/reduxStore.ts";
import { validateAnswer } from "./validateAnswer.ts";
import { Question } from "../question-retrieval/question.ts";
import { AppState } from "../../../store/appState.ts";
import { QuestionGatewayStub } from "../../../adapters/secondary/gateways/questionGatewayStub.ts";

describe("Answer validation", () => {
  let questionGateway: QuestionGatewayStub;
  let store: ReduxStore;
  let initialState: AppState;

  beforeEach(() => {
    questionGateway = new QuestionGatewayStub();
    store = initReduxStore({ questionGateway });
    initialState = store.getState();
  });

  it("should validate an answer", async () => {
    // GIVEN
    store.dispatch({
      type: "question/retrieved",
      payload: aQuestion,
    });
    initialState = store.getState();
    questionGateway.correctAnswer = { "123abc": "B" };

    // WHEN
    await store.dispatch(validateAnswer("A"));

    // THEN
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      answerValidation: {
        correct: "B",
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