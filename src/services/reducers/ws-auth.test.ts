import { wsAuthReducer as reducer, initialState as state } from "./ws-auth";
import {
  WsProfileConnectionStart,
  WsProfileConnectionSuccess,
  WsProfileConnectionError,
  WsProfileConnectionClosed,
  WsProfileGetMessage,
} from "../actions/ws-auth";
import { testWSMessage } from "../../utils/mock-data";

describe("websocket reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(state);
  });

  it("should handle WS_PROFILE_CONNECTION_START", () => {
    expect(reducer(state, WsProfileConnectionStart())).toEqual({
      ...state,
    });
  });

  it("should handle WS_PROFILE_CONNECTION_SUCCESS", () => {
    expect(reducer(state, WsProfileConnectionSuccess())).toEqual({
      ...state,
      isError: false,
      wsConnected: true,
    });
  });

  it("should handle WS_PROFILE_CONNECTION_ERROR", () => {
    expect(reducer(state, WsProfileConnectionError())).toEqual({
      ...state,
      isError: true,
      wsConnected: false,
    });
  });

  it("should handle WS_PROFILE_CONNECTION_CLOSED", () => {
    expect(reducer(state, WsProfileConnectionClosed())).toEqual({
      ...state,
      isError: false,
      wsConnected: false,
    });
  });

  it("should handle WS_PROFILE_GET_MESSAGE", () => {
    expect(reducer(state, WsProfileGetMessage(testWSMessage))).toEqual({
      ...state,
      orders: testWSMessage.orders,
      total: testWSMessage.total,
      totalToday: testWSMessage.totalToday,
    });
  });
});
