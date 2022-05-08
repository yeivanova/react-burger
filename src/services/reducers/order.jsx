import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/order";

const initialState = {
  number: 0,
  numberRequest: false,
  numberFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        numberRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number,
        numberRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        numberFailed: true,
        numberRequest: false,
      };
    }
    default:
      return state;
  }
};
