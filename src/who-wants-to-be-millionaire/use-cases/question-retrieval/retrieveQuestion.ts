import { QuestionGateway } from "../gateways/questionGateway.ts";

export const retrieveQuestion = async (questionGateway: QuestionGateway) => {
  return questionGateway.load();
};
