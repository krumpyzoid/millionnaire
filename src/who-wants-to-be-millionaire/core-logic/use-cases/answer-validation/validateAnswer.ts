import { QuestionGateway } from "../gateways/questionGateway.ts";
import { ReduxStore } from "../../../store/reduxStore.ts";
import { AnswerLetter } from "../question-retrieval/question.ts";

export const validateAnswer =
	(questionGateway: QuestionGateway, id: string, answer: AnswerLetter) =>
	async (dispatch: ReduxStore["dispatch"]) => {
		dispatch({
			type: "answer/validate",
			payload: await questionGateway.validateAnswer(id, answer),
		});
	};
