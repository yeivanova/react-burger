import {
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_MESSAGE,
  WS_PROFILE_SEND_MESSAGE,
} from "../constants/ws-auth";
import { TActionCreator } from "../types/index";
import { TWsOrders } from "../types/data";
import { TWebSocketActions } from "../types/ws";

export type TWsProfileConnectionStart = {
  type: typeof WS_PROFILE_CONNECTION_START;
};

export type TWsProfileConnectionSuccess = {
  type: typeof WS_PROFILE_CONNECTION_SUCCESS;
};

export type TWsProfileConnectionError = {
  type: typeof WS_PROFILE_CONNECTION_ERROR;
};

export type TWsProfileConnectionClosed = {
  type: typeof WS_PROFILE_CONNECTION_CLOSED;
};

export type TWsProfileGetMessage = TActionCreator<
  typeof WS_PROFILE_GET_MESSAGE,
  TWsOrders
>;

export type TWsProfileSendMessage = {
  type: typeof WS_PROFILE_SEND_MESSAGE;
};

export type TWsAuthActions =
  | TWsProfileConnectionStart
  | TWsProfileConnectionSuccess
  | TWsProfileConnectionError
  | TWsProfileConnectionClosed
  | TWsProfileGetMessage
  | TWsProfileSendMessage;

export const WsProfileConnectionStart = (): TWsProfileConnectionStart => ({
  type: WS_PROFILE_CONNECTION_START,
});

export const WsProfileConnectionSuccess = (): TWsProfileConnectionSuccess => ({
  type: WS_PROFILE_CONNECTION_SUCCESS,
});

export const WsProfileConnectionError = (): TWsProfileConnectionError => ({
  type: WS_PROFILE_CONNECTION_ERROR,
});

export const WsProfileConnectionClosed = (): TWsProfileConnectionClosed => ({
  type: WS_PROFILE_CONNECTION_CLOSED,
});

export const WsProfileGetMessage = (
  payload: TWsOrders
): TWsProfileGetMessage => ({
  type: WS_PROFILE_GET_MESSAGE,
  payload,
});

export const WsProfileSendMessage = (): TWsProfileSendMessage => ({
  type: WS_PROFILE_SEND_MESSAGE,
});

export const wsActionsProfile: TWebSocketActions = {
  onStart: WS_PROFILE_CONNECTION_START,
  onSendMessage: WS_PROFILE_SEND_MESSAGE,
  onOpen: WS_PROFILE_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_CONNECTION_CLOSED,
  onError: WS_PROFILE_CONNECTION_ERROR,
  onMessage: WS_PROFILE_GET_MESSAGE,
};
