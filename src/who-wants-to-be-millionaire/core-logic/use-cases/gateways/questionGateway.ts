import { Question } from "../question-retrieval/question.ts";

export interface QuestionGateway {
  load(): Promise<Question>;
}
