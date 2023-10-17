import { ValidatedAnswer } from "../use-cases/answer-validation/validatedAnswer.ts";
import { AnswerLetter, Question } from "../../store/appState.ts";

export interface QuestionGateway {
  load(): Promise<Question>;
  validateAnswer(id: string, answer: AnswerLetter): Promise<ValidatedAnswer>;
}
