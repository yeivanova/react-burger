import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "../services/middleware/socket-middleware";
import { wsUrl, wsAuthUrl } from "../utils/api";
import { wsActionsOrders } from "../services/actions/ws";
import { wsActionsProfile } from "../services/actions/ws-auth";

declare const window: any;

export const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActionsOrders),
    socketMiddleware(wsAuthUrl, wsActionsProfile, true)
  )
);

export const store = createStore(rootReducer, enhancer);
