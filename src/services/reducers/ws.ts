import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws";
import { TWsActions } from "../actions/ws";
import { TWsOrder } from "../types/data";

type TWSState = {
  wsConnected: boolean;
  error: Event | null;
  orders: Array<TWsOrder>;
  total: number | null;
  totalToday: number | null;
};

const initialState: TWSState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducer = (
  state: TWSState = initialState,
  action: TWsActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: null,
        wsConnected: false,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default:
      return state;
  }
};
