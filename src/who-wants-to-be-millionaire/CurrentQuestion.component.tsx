import { QuestionTitle } from "./QuestionTitle.component.tsx";
import { PossibleAnswers } from "./PossibleAnswers.component.tsx";
import jfoucault from "../assets/img/jfoucault.jpeg";
import { Countdown } from "./Countdown.tsx";

export const CurrentQuestion = () => {
  return (
    <div>
      <img src={jfoucault} alt="Jean-Pierre Foucault" />
      <br />
      <Countdown />
      <QuestionTitle title="Que signifie l'acronyme TDD ?" />
      <PossibleAnswers />
    </div>
  );
};
