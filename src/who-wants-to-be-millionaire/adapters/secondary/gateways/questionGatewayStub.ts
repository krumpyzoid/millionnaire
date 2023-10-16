import { QuestionGateway } from "../../../core-logic/gateways/questionGateway.ts";
import { Question } from "../../../core-logic/use-cases/question-retrieval/question.ts";

export class QuestionGatewayStub implements QuestionGateway {
  private _question: Question | null = null;

  async load(): Promise<Question> {
    return this._question!;
  }

  set question(question: Question) {
    this._question = question;
  }
}
