import {
  AnswerLetter,
  Question,
} from "../core-logic/use-cases/question-retrieval/question.ts";

export interface AppState {
  question: Question | null;
  answerValidation: {
    correct: AnswerLetter;
    given: AnswerLetter;
  } | null;
  pyramid: Pyramid;
}

export type Pyramid = {
  ladder: number[];
  currentLevel: number;
};
