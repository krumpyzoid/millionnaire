import React from "react";
import { CurrentQuestion } from "./CurrentQuestion.component.tsx";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { initReduxStore, ReduxStore } from "../../../../store/reduxStore.ts";
import { QuestionGatewayStub } from "../../../secondary/gateways/questionGatewayStub.ts";
import { Question } from "../../../../store/appState.ts";
import { vitest } from "vitest";

describe("CurrentQuestion component", () => {
  let store: ReduxStore;
  let questionGateway: QuestionGatewayStub;

  beforeEach(() => {
    questionGateway = new QuestionGatewayStub();
    store = initReduxStore({ dependencies: { questionGateway } });
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.useRealTimers();
  });

  it("should display the retrieved current question", async () => {
    questionGateway.question = aQuestion;
    render(
      <Provider store={store}>
        <CurrentQuestion />
      </Provider>,
    );
    vitest.useRealTimers();
    expect(
      await screen.findByTestId("current-question-data-bloc"),
    ).toBeTruthy();
  });

  it("should not display the question bloc before retrieving the question", async () => {
    questionGateway.question = aQuestion;
    render(
      <Provider store={store}>
        <CurrentQuestion />
      </Provider>,
    );
    vitest.useRealTimers();
    await waitFor(() => {
      expect(screen.queryByTestId("current-question-data-bloc")).toBeFalsy();
    });
  });

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
