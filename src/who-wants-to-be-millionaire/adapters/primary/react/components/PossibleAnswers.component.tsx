import { FC } from "react";
import { AppDispatch } from "../../../../store/reduxStore.ts";
import { useDispatch } from "react-redux";
import { validateAnswer } from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import { AnswerLetter } from "../../../../store/appState.ts";
import {
  AnswerStatus,
  PossibleAnswerVM,
} from "../selectors/possibleAnswers.selector.ts";

export type Props = {
  data: PossibleAnswerVM;
};

const answerStatusesColorMap: Record<AnswerStatus, string> = {
  CORRECT: "bg-green-500",
  WRONG: "bg-red-500",
  NONE: "bg-gray-900",
};

export const PossibleAnswers: FC<Props> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectAnswer = (answerLetter: AnswerLetter) => async () => {
    return dispatch(validateAnswer(answerLetter));
  };

  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(data!.possibleAnswers).map(([answerLetter, answerVM]) => (
        <button
          key={answerLetter}
          className={`border-3 border-blue-300 rounded-lg px-3 py-1 cursor-pointer text-left ${
            answerStatusesColorMap[answerVM.status]
          }`}
          onClick={selectAnswer(answerLetter as AnswerLetter)}
          type="button"
        >
          <span className="text-orange-500">{answerLetter}:</span>{" "}
          {answerVM.label}
        </button>
      ))}
    </div>
  );
};
