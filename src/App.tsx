import "./App.css";
import { CurrentQuestion } from "./who-wants-to-be-millionaire/CurrentQuestion.component.tsx";
import { Jokers } from "./who-wants-to-be-millionaire/Jokers.component.tsx";
import { Pyramid } from "./who-wants-to-be-millionaire/Pyramid.component.tsx";

function App() {
  return (
    <div className="App">
      <div className="flex justify-between mx-3">
        <div className="flex flex-col w-6/12">
          <CurrentQuestion />
        </div>
        <div className="flex flex-col w-6/12 bg-gradient-to-r from-indigo-900 ml-5">
          <div>
            <Jokers />
            <Pyramid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
