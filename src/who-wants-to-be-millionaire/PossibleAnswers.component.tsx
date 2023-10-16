import { FC } from "react";
import { Question } from "./core-logic/use-cases/question-retrieval/question.ts";

export type Props = {
  answers: Question["possibleAnswers"];
};

export const PossibleAnswers: FC<Props> = ({ answers }) => {
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(answers).map(([answerLetter, label]) => (
        <div
          key={answerLetter}
          className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
        >
          <span className="text-orange-500">{answerLetter}:</span> {label}
        </div>
      ))}
    </div>
  );
};
