import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initReduxStore } from "./who-wants-to-be-millionaire/store/reduxStore.ts";
import { Provider } from "react-redux";
import {
  LocalPoolQuestionGateway,
  QuestionPool,
  randomQuestionPoolPicker,
} from "./who-wants-to-be-millionaire/adapters/secondary/gateways/localPoolQuestionGateway.ts";
import {
  AnswerLetter,
  Question,
} from "./who-wants-to-be-millionaire/store/appState.ts";

const questionPool: QuestionPool = {
  "0": {
    id: "0",
    label: "Quelle est la couleur du cheval blanc d'Henri IV ?",
    possibleAnswers: {
      A: "Blanc",
      B: "Rouge",
      C: "Bleu",
      D: "Vert",
    },
  },
  "1": {
    id: "1",
    label: "Parmi ces animaux, lequel n'est pas un mammifère ?",
    possibleAnswers: {
      A: "La baleine",
      B: "Le dauphin",
      C: "Le requin",
      D: "Le lamantin",
    },
  },
  "2": {
    id: "2",
    label: "Quel est le plus grand pays du monde ?",
    possibleAnswers: {
      A: "La Russie",
      B: "Le Canada",
      C: "La Chine",
      D: "Les Etats-Unis",
    },
  },
};
const questionPoolAnswers: Record<Question["id"], AnswerLetter> = {
  "0": "A",
  "1": "B",
  "2": "A",
};
const questionGateway = new LocalPoolQuestionGateway(
  questionPool,
  questionPoolAnswers,
  randomQuestionPoolPicker,
);
const store = initReduxStore({
  dependencies: { questionGateway },
  pyramidLadder: [0, 200, 500, 150000, 1000000],
  enableListeners: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
