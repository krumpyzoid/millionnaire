import { AnswerLetter } from "../../../store/appState.ts";

export type ValidatedAnswer = {
  correct: AnswerLetter;
  given: AnswerLetter;
};
