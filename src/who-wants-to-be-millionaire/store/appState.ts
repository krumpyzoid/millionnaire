export interface AppState {
  question: Question | null;
  answerValidation: AnswerValidation;
  pyramid: Pyramid;
}

export type Pyramid = {
  ladder: number[];
  currentLevel: number;
};

export type AnswerValidation = {
  correct: AnswerLetter;
  given: AnswerLetter;
} | null;

export type Question = {
  id: string;
  label: string;
  possibleAnswers: Record<AnswerLetter, AnswerLabel>;
};

export type AnswerLetter = "A" | "B" | "C" | "D";
export type AnswerLabel = string;
