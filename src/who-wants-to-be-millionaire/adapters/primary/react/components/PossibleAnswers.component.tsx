import { FC } from "react";
import { AppDispatch } from "../../../../store/reduxStore.ts";
import { useDispatch, useSelector } from "react-redux";
import { validateAnswer } from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import { AnswerLetter, AppState, Question } from "../../../../store/appState.ts";

export type Props = {
  answers: Question["possibleAnswers"];
};

export const PossibleAnswers: FC<Props> = ({ answers }) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectAnswer = (answerLetter: AnswerLetter) => async () => {
    return dispatch(validateAnswer(answerLetter));
  };

  const validatedAnswer = useSelector((state: AppState) => state.answerValidation);
  
  if (validatedAnswer) return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(answers).map(([answerLetter, label]) => {
        let style = '';
        if (answerLetter === validatedAnswer.given && validatedAnswer.given !== validatedAnswer.correct) style = 'bg-red-500';
        if (answerLetter === validatedAnswer.correct) style = 'bg-green-500';
        return (
          <div
            key={answerLetter}
            className={`border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900 ${style}`}
          >
            <span className="text-orange-500">{answerLetter}:</span> {label}
          </div>
      )})}
    </div>
  );

  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(answers).map(([answerLetter, label]) => (
        <button
          key={answerLetter}
          className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900 cursor-pointer text-left"
          onClick={selectAnswer(answerLetter as AnswerLetter)}
          type="button"
        >
          <span className="text-orange-500">{answerLetter}:</span> {label}
        </button>
      ))}
    </div>
  );
};
