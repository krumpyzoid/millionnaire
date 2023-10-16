import { QuestionTitle } from "./QuestionTitle.component.tsx";
import { PossibleAnswers } from "./PossibleAnswers.component.tsx";
import jfoucault from "../assets/img/jfoucault.jpeg";
import { Countdown } from "./Countdown.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { retrieveQuestion } from "./core-logic/use-cases/question-retrieval/retrieveQuestion.ts";
import { AppDispatch } from "./store/reduxStore.ts";
import { AppState } from "./store/appState.ts";

export const CurrentQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector((state: AppState) => state.question);

  useEffect(() => {
    (async () => {
      await dispatch(retrieveQuestion());
    })();
  }, [dispatch]);

  return (
    <div>
      <img src={jfoucault} alt="Jean-Pierre Foucault" />
      <br />
      {question && (
        <div>
          <Countdown />
          <QuestionTitle title={question.label} />
          <PossibleAnswers answers={question.possibleAnswers} />
        </div>
      )}
    </div>
  );
};
