import { selectPyramid } from "./pyramid.selector.ts";
import { answerValidatedAction } from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import { initReduxStore, ReduxStore } from "../../../../store/reduxStore.ts";

describe("Pyramid selector", () => {
  let store: ReduxStore;

  beforeEach(() => {
    store = initReduxStore({ pyramidLadder: [0, 1, 20000] });
  });

  describe("The question has not been validated", () => {
    it("should should show a reset pyramid in reverse order", () => {
      expect(selectPyramid(store.getState())).toEqual({
        ladder: ["20\u202f000", "1", "0"],
        currentLevel: 2,
      });
      expect(store.getState().pyramid.ladder).toEqual([0, 1, 20000]);
    });
  });

  describe("The question has been validated", () => {
    it("should decrease the current level because the pyramid is reversed", () => {
      store.dispatch(answerValidatedAction({ correct: "A", given: "A" }));
      expect(selectPyramid(store.getState())).toEqual({
        ladder: ["20\u202f000", "1", "0"],
        currentLevel: 1,
      });
    });
  });
});
