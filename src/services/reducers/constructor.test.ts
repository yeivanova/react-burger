import {
  constructorReducer as reducer,
  cartInitialState as state,
} from "./constructor";
import {
  addItem,
  deleteItem,
  setBun,
  sortItems,
  cartReset,
} from "../actions/constructor";
import {
  testIngredient,
  testBun,
  testOneMoreIngredient,
} from "../../utils/mock-data";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(state);
  });

  it("should handle ADD_ITEM", () => {
    expect(reducer(state, addItem(testIngredient))).toEqual({
      ...state,
      cartItems: [testIngredient],
    });
  });

  it("should handle DELETE_ITEM", () => {
    expect(reducer(state, deleteItem(testIngredient))).toEqual({
      ...state,
      cartItems: [...state.cartItems].filter((item) => item !== testIngredient),
    });
  });

  it("should handle SET_BUN", () => {
    expect(reducer(state, setBun(testBun))).toEqual({
      ...state,
      bunItem: testBun,
    });
  });

  it("should handle SORT_ITEMS", () => {
    expect(
      reducer(state, sortItems([testIngredient, testOneMoreIngredient]))
    ).toEqual({
      ...state,
      cartItems: [testIngredient, testOneMoreIngredient],
    });
  });

  it("should handle CART_RESET", () => {
    expect(reducer(state, cartReset())).toEqual({
      ...state,
      cartItems: [],
      bunItem: null,
    });
  });
});
