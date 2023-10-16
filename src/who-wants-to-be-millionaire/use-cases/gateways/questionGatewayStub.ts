import { QuestionGateway } from "./questionGateway.ts";
import { Question } from "../question-retrieval/question.ts";

export class QuestionGatewayStub implements QuestionGateway {
  private _question: Question | null = null;

  async load(): Promise<Question> {
    return this._question!;
  }

  set question(question: Question) {
    this._question = question;
  }
}
