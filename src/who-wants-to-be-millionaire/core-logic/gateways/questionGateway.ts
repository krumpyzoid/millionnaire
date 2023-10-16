import {
  AnswerLetter,
  Question,
} from "../use-cases/question-retrieval/question.ts";
import { ValidatedAnswer } from "../use-cases/answer-validation/validatedAnswer.ts";

export interface QuestionGateway {
  load(): Promise<Question>;
  validateAnswer(id: string, answer: AnswerLetter): Promise<ValidatedAnswer>;
}
