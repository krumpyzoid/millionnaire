import { QuestionGateway } from "../gateways/questionGateway.ts";
import { ReduxStore } from "../../../store/reduxStore.ts";

export const retrieveQuestion =
  (questionGateway: QuestionGateway) =>
  async (dispatch: ReduxStore["dispatch"]) => {
    dispatch({
      type: "question/retrieved",
      payload: await questionGateway.load(),
    });
  };
