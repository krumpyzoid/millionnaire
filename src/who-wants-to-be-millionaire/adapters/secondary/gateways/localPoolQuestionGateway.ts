import { QuestionGateway } from "../../../core-logic/gateways/questionGateway.ts";
import { AnswerLetter, Question } from "../../../store/appState.ts";
import { ValidatedAnswer } from "../../../core-logic/use-cases/answer-validation/validatedAnswer.ts";

export type QuestionPool = Record<Question["id"], Question>;

export type QuestionPoolPicker = (questionPool: QuestionPool) => Question;
export const randomQuestionPoolPicker: QuestionPoolPicker = (questionPool) => {
  const questionsIds = Object.keys(questionPool);
  const questionsIdsIndex = Math.floor(Math.random() * questionsIds.length);
  const nextQuestionId = questionsIds[questionsIdsIndex];
  return questionPool[nextQuestionId];
};

export const deterministicQuestionPoolPicker =
  (nextQuestionId: Question["id"]): QuestionPoolPicker =>
  (questionPool: QuestionPool) => {
    return questionPool[nextQuestionId];
  };

export class LocalPoolQuestionGateway implements QuestionGateway {
  constructor(
    private _questionPool: QuestionPool,
    private readonly _questionPoolAnswers: Record<Question["id"], AnswerLetter>,
    private readonly _questionPoolPicker: QuestionPoolPicker,
  ) {}
  async load(): Promise<Question> {
    const nextQuestion = this._questionPoolPicker(this._questionPool);
    const { [nextQuestion.id]: _, ...newQuestionPool } = this._questionPool;
    this._questionPool = newQuestionPool;
    return nextQuestion;
  }

  async validateAnswer(
    id: string,
    answer: AnswerLetter,
  ): Promise<ValidatedAnswer> {
    return {
      given: answer,
      correct: this._questionPoolAnswers[id],
    };
  }

  get questionPool(): QuestionPool {
    return this._questionPool;
  }
}
