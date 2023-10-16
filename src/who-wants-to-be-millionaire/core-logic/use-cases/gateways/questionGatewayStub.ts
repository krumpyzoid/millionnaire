import { QuestionGateway } from "./questionGateway.ts";
import { AnswerLetter, Question } from "../question-retrieval/question.ts";
import { ValidatedAnswer } from "../answer-validation/validatedAnswer.ts";

export class QuestionGatewayStub implements QuestionGateway {
	private _question: Question | null = null;

	async load(): Promise<Question> {
		return this._question!;
	}

	async validateAnswer(
		id: string,
		answer: AnswerLetter
	): Promise<ValidatedAnswer> {
		return {
			id,
			answer: "B",
			given: answer,
		};
	}

	set question(question: Question) {
		this._question = question;
	}
}
