import { Question } from "../core-logic/use-cases/question-retrieval/question.ts";

export interface AppState {
  question: Question | null;
}
