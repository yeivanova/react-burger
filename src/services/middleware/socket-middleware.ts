import { TWebSocketActions } from "../types/ws";
import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../types";
import { getCookie } from "../../utils/utils";

export const socketMiddleware = (
  wsUrl: string,
  wActions: TWebSocketActions,
  isAuth?: boolean
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    const { onStart, onOpen, onClose, onError, onMessage, onSendMessage } =
      wActions;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      const accessToken = getCookie("accessToken");

      if (isAuth) {
        wsUrl += `?token=${accessToken}`;
      }

      if (type === onStart) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === onSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
