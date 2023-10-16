export type Question = {
  id: string;
  label: string;
  possibleAnswers: Record<AnswerLetter, AnswerLabel>;
};

export type AnswerLetter = "A" | "B" | "C" | "D";
export type AnswerLabel = string;
