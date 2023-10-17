import { useSelector } from "react-redux";
import { selectPyramidSelector } from "../selectors/pyramid.selector.ts";

export const Pyramid = () => {
  const pyramidVM = useSelector(selectPyramidSelector);

  return (
    <div className="mt-3 justify-center rounded-lg text-yellow-500">
      <div className="flex flex-col justify-center">
        <ul className="flex flex-col mx-auto">
          {pyramidVM.ladder.map((amount, index) => (
            <li key={index} className={`mb-3`}>
              {amount} €
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
