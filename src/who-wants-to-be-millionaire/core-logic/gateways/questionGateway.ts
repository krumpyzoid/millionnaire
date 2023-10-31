import { ValidatedAnswer } from "../use-cases/answer-validation/validatedAnswer.ts";
import {
	AnswerLetter,
	Question,
	RemovedAnswers,
} from "../../store/appState.ts";

export interface QuestionGateway {
	load(): Promise<Question>;
	validateAnswer(id: string, answer: AnswerLetter): Promise<ValidatedAnswer>;
	getTwoFalseAnswers(id: string): Promise<RemovedAnswers>;
}
