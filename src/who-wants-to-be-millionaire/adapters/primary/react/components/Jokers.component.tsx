import { AppDispatch } from "../../../../store/reduxStore.ts";
import { useDispatch, useSelector } from "react-redux";
import { removeTwoAnswers } from "../../../../core-logic/use-cases/two-answers-removal/removeTwoAnswers";
import { AppState } from "../../../../store/appState.ts";

export const Jokers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fiftyFifty = useSelector((state: AppState) => state.removedAnswers);
  const specialStyles = fiftyFifty ? 'opacity-50 cursor-default' : 'hover:bg-blue-500';
  
  const consumeFiftyFifty = () => async () => {
    return dispatch(removeTwoAnswers());
  };

  return (
    <div className="bg-black-800 text-white mt-3 text-center">
      <ul>
        <li className="inline-block">
          <button className={`rounded-full w-30 bg-gray-900 p-3 border-2 border-blue-500 ${specialStyles}`} onClick={consumeFiftyFifty()}>
            <strong>50:50</strong>
          </button>
        </li>
      </ul>
    </div>
  );
};
