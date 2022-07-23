import { orderReducer as reducer, initialState as state } from "./order";
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  numberReset,
} from "../actions/order";

describe("orders reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(state);
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(reducer(state, getOrderRequest())).toEqual({
      ...state,
      numberRequest: true,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(reducer(state, getOrderSuccess(123))).toEqual({
      ...state,
      number: 123,
      numberRequest: false,
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(reducer(state, getOrderFailed())).toEqual({
      ...state,
      number: null,
      numberFailed: true,
      numberRequest: false,
    });
  });

  it("should handle NUMBER_RESET", () => {
    expect(reducer(state, numberReset())).toEqual({
      ...state,
      number: null,
    });
  });
});
