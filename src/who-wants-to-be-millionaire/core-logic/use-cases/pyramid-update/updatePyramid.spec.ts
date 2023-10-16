import { AppState } from "../../../store/appState.ts";
import { initReduxStore, ReduxStore } from "../../../store/reduxStore.ts";
import { answerValidatedAction } from "../answer-validation/validateAnswer.ts";

describe("updatePyramid", () => {
  let store: ReduxStore;
  let initialState: AppState;

  beforeEach(() => {
    store = initReduxStore({
      pyramidLadder: [0, 10, 20],
    });
    initialState = store.getState();
  });

  it("initially, should have reset the pyramid", () => {
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      pyramid: {
        ...initialState.pyramid,
        currentLevel: 0,
      },
    });
  });

  describe("When the answer is correct", () => {
    beforeEach(() => {
      store.dispatch(
        answerValidatedAction({
          correct: "A",
          given: "A",
        }),
      );
      initialState = store.getState();
    });

    it("should increase the pyramid by one level", () => {
      expect(store.getState()).toEqual<AppState>({
        ...initialState,
        pyramid: {
          ...initialState.pyramid,
          currentLevel: 1,
        },
      });
    });

    it("should increase the pyramid by two levels after two right answers", () => {
      store.dispatch(
        answerValidatedAction({
          correct: "A",
          given: "A",
        }),
      );
      expect(store.getState()).toEqual<AppState>({
        ...initialState,
        pyramid: {
          ...initialState.pyramid,
          currentLevel: 2,
        },
      });
    });
  });

  describe("When the answer is wrong", () => {
    beforeEach(() => {
      store.dispatch(
        answerValidatedAction({
          correct: "A",
          given: "B",
        }),
      );
      initialState = store.getState();
    });

    it("should reset the pyramid", () => {
      expect(store.getState()).toEqual<AppState>({
        ...initialState,
        pyramid: {
          ...initialState.pyramid,
          currentLevel: 0,
        },
      });
    });

    describe("Level Two has already been reached", () => {
      beforeEach(() => {
        for (let i = 0; i < 2; i++)
          store.dispatch(
            answerValidatedAction({
              correct: "A",
              given: "A",
            }),
          );
        initialState = store.getState();
      });

      it("should reset the pyramid", () => {
        store.dispatch(
          answerValidatedAction({
            correct: "A",
            given: "B",
          }),
        );
        initialState = store.getState();
        expect(store.getState()).toEqual<AppState>({
          ...initialState,
          pyramid: {
            ...initialState.pyramid,
            currentLevel: 0,
          },
        });
      });
    });
  });
});
