import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../constants/ws";
import { TActionCreator } from "../types/index";
import { TWsOrders } from "../types/data";
import { TWebSocketActions } from "../types/ws";

export type TWsOrderConnectionStart = {
  type: typeof WS_CONNECTION_START;
};

export type TWsOrderConnectionSuccess = {
  type: typeof WS_CONNECTION_SUCCESS;
};

export type TWsOrderConnectionError = {
  type: typeof WS_CONNECTION_ERROR;
};

export type TWsOrderConnectionClosed = {
  type: typeof WS_CONNECTION_CLOSED;
};

export type TWsOrderGetMessage = TActionCreator<
  typeof WS_GET_MESSAGE,
  TWsOrders
>;

export type TWsOrderSendMessage = {
  type: typeof WS_SEND_MESSAGE;
};

export type TWsActions =
  | TWsOrderConnectionStart
  | TWsOrderConnectionSuccess
  | TWsOrderConnectionError
  | TWsOrderConnectionClosed
  | TWsOrderGetMessage
  | TWsOrderSendMessage;

export const WsOrderConnectionStart = (): TWsOrderConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const WsOrderConnectionSuccess = (): TWsOrderConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const WsOrderConnectionError = (): TWsOrderConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const WsOrderConnectionClosed = (): TWsOrderConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const WsOrderGetMessage = (payload: TWsOrders): TWsOrderGetMessage => ({
  type: WS_GET_MESSAGE,
  payload,
});

export const WsOrderSendMessage = (): TWsOrderSendMessage => ({
  type: WS_SEND_MESSAGE,
});

export const wsActionsOrders: TWebSocketActions = {
  onStart: WS_CONNECTION_START,
  onSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
