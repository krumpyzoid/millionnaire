import {
  deterministicQuestionPoolPicker,
  LocalPoolQuestionGateway,
  QuestionPool,
} from "./localPoolQuestionGateway.ts";
import { AnswerLetter, Question } from "../../../store/appState.ts";
import { ValidatedAnswer } from "../../../core-logic/use-cases/answer-validation/validatedAnswer.ts";

describe("Local pool question gateway", () => {
  it("should pick a question from the local pool randomly", async () => {
    const questionGateway = newLocalPoolQuestionGateway("1");
    expect(await questionGateway.load()).toEqual(questionPool["1"]);
    expect(questionGateway.questionPool).toEqual({
      "2": questionPool["2"],
    });
  });

  it("should validate an answer", async () => {
    expect(
      await newLocalPoolQuestionGateway("1").validateAnswer("1", "A"),
    ).toEqual<ValidatedAnswer>({
      given: "A",
      correct: "B",
    });
  });

  const newLocalPoolQuestionGateway = (
    expectedNextQuestionId: Question["id"],
  ) =>
    new LocalPoolQuestionGateway(
      questionPool,
      questionPoolAnswers,
      deterministicQuestionPoolPicker(expectedNextQuestionId),
    );

  const questionPool: QuestionPool = {
    "1": {
      id: "1",
      label: "Question 1",
      possibleAnswers: {
        A: "Answer A",
        B: "Answer B",
        C: "Answer C",
        D: "Answer D",
      },
    },
    "2": {
      id: "2",
      label: "Question 2",
      possibleAnswers: {
        A: "Answer A",
        B: "Answer B",
        C: "Answer C",
        D: "Answer D",
      },
    },
  };
  const questionPoolAnswers: Record<Question["id"], AnswerLetter> = {
    "1": "B",
    "2": "D",
  };
});
