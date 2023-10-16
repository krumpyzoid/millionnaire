import { AppThunk, ReduxStore } from "../../../store/reduxStore.ts";
import { AnswerLetter } from "../question-retrieval/question.ts";
import { QuestionGateway } from "../../gateways/questionGateway.ts";
import { createAction } from "@reduxjs/toolkit";
import { ValidatedAnswer } from "./validatedAnswer.ts";

export const answerValidatedAction =
  createAction<ValidatedAnswer>("answer/validated");

export const validateAnswer =
  (answer: AnswerLetter): AppThunk<Promise<void>> =>
  async (
    dispatch: ReduxStore["dispatch"],
    getState,
    { questionGateway }: { questionGateway: QuestionGateway },
  ) => {
    const validatedAnswer = await questionGateway.validateAnswer(
      getState().question!.id,
      answer,
    );
    dispatch(answerValidatedAction(validatedAnswer));
  };
