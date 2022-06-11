import { baseUrl } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { tokenRequest } from "./user";
export const GET_ORDER_REQUEST = "ORDER/GET_REQUEST";
export const GET_ORDER_SUCCESS = "ORDER/GET_SUCCESS";
export const GET_ORDER_FAILED = "ORDER/GET_FAILED";
export const NUMBER_RESET = "NUMBER_RESET";

const urlApi = `${baseUrl}/orders`;
export function getOrder(orderContent) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients: orderContent,
    }),
  };
  return async function (dispatch) {
    if (typeof getCookie("accessToken") === "undefined") {
      await tokenRequest();
    }
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(urlApi, requestOptions)
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            number: data.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
