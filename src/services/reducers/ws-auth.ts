import {
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_MESSAGE,
} from "../constants/ws-auth";
import { TWsAuthActions } from "../actions/ws-auth";
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

export const wsAuthReducer = (
  state: TWSState = initialState,
  action: TWsAuthActions
): TWSState => {
  switch (action.type) {
    case WS_PROFILE_CONNECTION_START: {
      return {
        ...state,
      };
    }
    case WS_PROFILE_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    }
    case WS_PROFILE_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    }
    case WS_PROFILE_CONNECTION_CLOSED: {
      return {
        ...state,
        error: null,
        wsConnected: false,
      };
    }
    case WS_PROFILE_GET_MESSAGE: {
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
