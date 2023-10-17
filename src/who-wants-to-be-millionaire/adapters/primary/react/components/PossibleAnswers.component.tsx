import { FC } from "react";
import { AppDispatch } from "../../../../store/reduxStore.ts";
import { useDispatch } from "react-redux";
import { validateAnswer } from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import { AnswerLetter, Question } from "../../../../store/appState.ts";

export type Props = {
  answers: Question["possibleAnswers"];
};

export const PossibleAnswers: FC<Props> = ({ answers }) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectAnswer = (answerLetter: AnswerLetter) => async () => {
    return dispatch(validateAnswer(answerLetter));
  };

  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(answers).map(([answerLetter, label]) => (
        <div
          key={answerLetter}
          className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
          onClick={selectAnswer(answerLetter as AnswerLetter)}
        >
          <span className="text-orange-500">{answerLetter}:</span> {label}
        </div>
      ))}
    </div>
  );
};
