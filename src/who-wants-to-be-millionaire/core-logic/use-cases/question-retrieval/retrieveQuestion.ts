import { AppThunk, ReduxStore } from "../../../store/reduxStore.ts";
import { QuestionGateway } from "../../gateways/questionGateway.ts";

export const retrieveQuestion =
  (): AppThunk<Promise<void>> =>
  async (
    dispatch: ReduxStore["dispatch"],
    _,
    {
      questionGateway,
    }: {
      questionGateway: QuestionGateway;
    },
  ) => {
    dispatch({
      type: "question/retrieved",
      payload: await questionGateway.load(),
    });
  };
