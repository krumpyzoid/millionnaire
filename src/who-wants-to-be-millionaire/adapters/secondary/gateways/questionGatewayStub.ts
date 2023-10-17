import { QuestionGateway } from "../../../core-logic/gateways/questionGateway.ts";
import { ValidatedAnswer } from "../../../core-logic/use-cases/answer-validation/validatedAnswer.ts";
import { AnswerLetter, Question } from "../../../store/appState.ts";

export class QuestionGatewayStub implements QuestionGateway {
  private _question: Question | null = null;
  private _correctAnswerById: Record<string, AnswerLetter> = {};

  async load(): Promise<Question> {
    return this._question!;
  }

  async validateAnswer(
    id: string,
    given: AnswerLetter,
  ): Promise<ValidatedAnswer> {
    return {
      correct: this._correctAnswerById[id]!,
      given,
    };
  }

  set question(question: Question) {
    this._question = question;
  }

  set correctAnswer(correctAnswerByQuestionId: Record<string, AnswerLetter>) {
    this._correctAnswerById = correctAnswerByQuestionId;
  }
}
