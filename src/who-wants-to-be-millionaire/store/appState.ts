export interface AppState {
  question: Question | null;
  answerValidation: {
    correct: AnswerLetter;
    given: AnswerLetter;
  } | null;
  pyramid: Pyramid;
}

export type Pyramid = {
  ladder: number[];
  currentLevel: number;
};

export type Question = {
  id: string;
  label: string;
  possibleAnswers: Record<AnswerLetter, AnswerLabel>;
};

export type AnswerLetter = "A" | "B" | "C" | "D";
export type AnswerLabel = string;
