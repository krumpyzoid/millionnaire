import { Question } from "../use-cases/question-retrieval/question.ts";

export interface QuestionGateway {
  load(): Promise<Question>;
}
