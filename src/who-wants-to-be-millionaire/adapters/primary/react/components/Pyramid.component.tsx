import { useSelector } from "react-redux";
import { selectPyramid } from "../selectors/pyramid.selector.ts";

export const Pyramid = () => {
  const pyramidVM = useSelector(selectPyramid);

  return (
    <div className="mt-3 justify-center rounded-lg text-yellow-500">
      <div className="flex flex-col justify-center">
        <ul className="flex flex-col mx-auto">
          {pyramidVM.ladder.map((amount, index) => (
            <li
              key={index}
              className={`mb-3 ${
                pyramidVM.currentLevel === index ? "text-white font-bold" : ""
              }`}
            >
              <div
                className={
                  pyramidVM.currentLevel === index
                    ? "rounded-full bg-orange-500"
                    : ""
                }
              >
                {amount} €
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
