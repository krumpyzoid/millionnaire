import { Question } from "../question-retrieval/question.ts";
import { AnswerLetter } from "../question-retrieval/question.ts";
import { ValidatedAnswer } from "../answer-validation/validatedAnswer.ts";

export interface QuestionGateway {
	load(): Promise<Question>;
	validateAnswer(id: string, answer: AnswerLetter): Promise<ValidatedAnswer>;
}
