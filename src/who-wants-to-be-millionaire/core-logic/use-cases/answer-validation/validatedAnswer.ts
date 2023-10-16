import { AnswerLetter } from "../question-retrieval/question.ts";

export type ValidatedAnswer = {
	id: string;
	answer: AnswerLetter;
	given: AnswerLetter;
};
