import {
  ingredientsReducer as reducer,
  initialState as state,
  tabReducer,
  initialStateTab as stateTab,
} from "./ingredients";
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  changeTab,
} from "../actions/ingredients";
import { testIngredient } from "../../utils/mock-data";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(state);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(reducer(state, getIngredientsRequest())).toEqual({
      ...state,
      itemsRequest: true,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      reducer(state, getIngredientsSuccess([testIngredient, testIngredient]))
    ).toEqual({
      ...state,
      items: [testIngredient, testIngredient],
      itemsRequest: false,
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(reducer(state, getIngredientsFailed())).toEqual({
      ...state,
      itemsFailed: true,
      itemsRequest: false,
    });
  });
});

describe("tab reducer", () => {
  it("should return the initial state", () => {
    expect(tabReducer(undefined, {} as any)).toEqual(stateTab);
  });

  it("should handle CHANGE_TAB", () => {
    expect(tabReducer(stateTab, changeTab("sauce"))).toEqual({
      ...stateTab,
      currentTab: "sauce",
    });
  });
});
