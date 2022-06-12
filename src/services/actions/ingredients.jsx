import { baseUrl } from "../../utils/api";
export const GET_INGREDIENTS_REQUEST = "INGREDIENTS/GET_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "INGREDIENTS/GET_SUCCESS";
export const GET_INGREDIENTS_FAILED = "INGREDIENTS/GET_FAILED";
export const CHANGE_TAB = "CHANGE_TAB";

function getIngredientsRequest() {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
}

function getIngredientsSuccess(data) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    items: data,
  };
}

function getIngredientsFailed() {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
}

export function changeTab(currentTab) {
  return {
    type: CHANGE_TAB,
    currentTab: currentTab,
  };
}

const urlApi = `${baseUrl}/ingredients`;
export function loadData() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    fetch(urlApi)
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((items) => {
        if (items && items.success) {
          dispatch(getIngredientsSuccess(items.data));
        } else {
          dispatch(getIngredientsFailed());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
      });
  };
}
