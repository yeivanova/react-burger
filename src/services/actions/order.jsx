export const GET_ORDER_REQUEST = "ORDER/GET_REQUEST";
export const GET_ORDER_SUCCESS = "ORDER/GET_SUCCESS";
export const GET_ORDER_FAILED = "ORDER/GET_FAILED";
export const NUMBER_RESET = "NUMBER_RESET";

export function getOrderRequest() {
  return {
    type: GET_ORDER_REQUEST,
  };
}

export function getOrderSuccess(number) {
  return {
    type: GET_ORDER_SUCCESS,
    number: number,
  };
}

export function getOrderFailed() {
  return {
    type: GET_ORDER_FAILED,
  };
}

export function numberReset() {
  return {
    type: NUMBER_RESET,
  };
}
