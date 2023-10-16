import { retrieveQuestion } from "./retrieveQuestion.ts";
import { QuestionGatewayStub } from "../gateways/questionGatewayStub.ts";
import { Question } from "./question.ts";

describe("Question retrieval", () => {
  let questionGateway: QuestionGatewayStub;

  beforeEach(() => {
    questionGateway = new QuestionGatewayStub();
  });

  it("should retrieve a new question", async () => {
    questionGateway.question = aQuestion;
    expect(await retrieveQuestion(questionGateway)).toEqual(aQuestion);
  });

  const aQuestion: Question = {
    id: "123abc",
  };
});
