import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  NUMBER_RESET,
} from "../constants/order";
import { TActionCreator } from "../types/index";

export type TGetOrderRequestAction = {
  type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccessAction = TActionCreator<
  typeof GET_ORDER_SUCCESS,
  number
>;

export type TGetOrderFailedAction = {
  type: typeof GET_ORDER_FAILED;
};

export type TNumberResetAction = {
  type: typeof NUMBER_RESET;
};

export type TOrderActions =
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction
  | TNumberResetAction;

export const getOrderRequest = (): TGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccess = (payload: number): TGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload,
});

export const getOrderFailed = (): TGetOrderFailedAction => {
  return {
    type: GET_ORDER_FAILED,
  };
};

export const numberReset = (): TNumberResetAction => {
  return {
    type: NUMBER_RESET,
  };
};
