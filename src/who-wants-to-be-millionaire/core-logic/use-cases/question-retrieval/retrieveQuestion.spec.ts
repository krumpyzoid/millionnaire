import { retrieveQuestion } from "./retrieveQuestion.ts";
import { QuestionGatewayStub } from "../../../adapters/secondary/gateways/questionGatewayStub.ts";
import { initReduxStore, ReduxStore } from "../../../store/reduxStore.ts";
import { AppState, Question } from "../../../store/appState.ts";

describe("Question retrieval", () => {
  let questionGateway: QuestionGatewayStub;
  let store: ReduxStore;
  let initialState: AppState;

  beforeEach(() => {
    questionGateway = new QuestionGatewayStub();
    store = initReduxStore({ dependencies: { questionGateway } });
    initialState = store.getState();
  });

  it("should retrieve a new question", async () => {
    // GIVEN
    questionGateway.question = aQuestion;

    // WHEN
    await store.dispatch(retrieveQuestion());

    // THEN
    expect(store.getState()).toEqual({
      ...initialState,
      question: aQuestion,
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
