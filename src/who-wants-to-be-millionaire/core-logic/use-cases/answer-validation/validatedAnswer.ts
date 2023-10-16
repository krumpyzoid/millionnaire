import { AnswerLetter } from "../question-retrieval/question.ts";

export type ValidatedAnswer = {
  correct: AnswerLetter;
  given: AnswerLetter;
};
