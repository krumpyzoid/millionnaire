import { AppThunk, ReduxStore } from "../../../store/reduxStore.ts";
import { QuestionGateway } from "../../gateways/questionGateway.ts";
import { createAction } from "@reduxjs/toolkit";
import { Question } from "./question.ts";

export const retrievedQuestion = createAction<Question>("question/retrieved");

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
    dispatch(retrievedQuestion(await questionGateway.load()));
  };
