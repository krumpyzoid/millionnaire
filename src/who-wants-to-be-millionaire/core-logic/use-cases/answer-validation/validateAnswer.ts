import { AppThunk, ReduxStore } from "../../../store/reduxStore.ts";
import { AnswerLetter } from "../question-retrieval/question.ts";
import { QuestionGateway } from "../../gateways/questionGateway.ts";

export const validateAnswer =
  (answer: AnswerLetter): AppThunk<Promise<void>> =>
  async (
    dispatch: ReduxStore["dispatch"],
    getState,
    { questionGateway }: { questionGateway: QuestionGateway },
  ) => {
    dispatch({
      type: "answer/validated",
      payload: await questionGateway.validateAnswer(
        getState().question!.id,
        answer,
      ),
    });
  };
