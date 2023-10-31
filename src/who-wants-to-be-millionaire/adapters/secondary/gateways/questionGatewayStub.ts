import { QuestionGateway } from "../../../core-logic/gateways/questionGateway.ts";
import { ValidatedAnswer } from "../../../core-logic/use-cases/answer-validation/validatedAnswer.ts";
import {
	AnswerLetter,
	Question,
	RemovedAnswers,
} from "../../../store/appState.ts";

export class QuestionGatewayStub implements QuestionGateway {
	private _question: Question | null = null;
	private _correctAnswerById: Record<string, AnswerLetter> = {};

	async load(): Promise<Question> {
		return this._question!;
	}

	async validateAnswer(
		id: string,
		given: AnswerLetter
	): Promise<ValidatedAnswer> {
		return {
			correct: this._correctAnswerById[id]!,
			given,
		};
	}

	async getTwoFalseAnswers(id: string): Promise<RemovedAnswers> {
		const correctAnswer = this._correctAnswerById[id]!;
		const answersToBeRemoved = ["A", "B", "C", "D"]
			.filter((answer) => answer !== correctAnswer)
			.slice(0, -1) as AnswerLetter[];
		return {
			questionId: id,
			removedAnswers: answersToBeRemoved,
		};
	}

	set question(question: Question) {
		this._question = question;
	}

	set correctAnswer(correctAnswerByQuestionId: Record<string, AnswerLetter>) {
		this._correctAnswerById = correctAnswerByQuestionId;
	}
}
