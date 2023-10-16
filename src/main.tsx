import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initReduxStore } from "./who-wants-to-be-millionaire/store/reduxStore.ts";
import { QuestionGatewayStub } from "./who-wants-to-be-millionaire/adapters/secondary/gateways/questionGatewayStub.ts";
import { Provider } from "react-redux";

const questionGateway = new QuestionGatewayStub();
const store = initReduxStore({ questionGateway });

questionGateway.question = {
  id: "1",
  label:
    "What is the answer to the Ultimate Question of Life, the Universe, and Everything?",
  possibleAnswers: {
    A: "42",
    B: "24",
    C: "404",
    D: "666",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
