import { wsReducer as reducer, initialState as state } from "./ws";
import {
  WsOrderConnectionStart,
  WsOrderConnectionSuccess,
  WsOrderConnectionError,
  WsOrderConnectionClosed,
  WsOrderGetMessage,
} from "../actions/ws";
import { testWSMessage } from "../../utils/mock-data";

describe("websocket reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(state);
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(reducer(state, WsOrderConnectionStart())).toEqual({
      ...state,
    });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(reducer(state, WsOrderConnectionSuccess())).toEqual({
      ...state,
      isError: false,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(reducer(state, WsOrderConnectionError())).toEqual({
      ...state,
      isError: true,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(reducer(state, WsOrderConnectionClosed())).toEqual({
      ...state,
      isError: false,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(reducer(state, WsOrderGetMessage(testWSMessage))).toEqual({
      ...state,
      orders: testWSMessage.orders,
      total: testWSMessage.total,
      totalToday: testWSMessage.totalToday,
    });
  });
});
