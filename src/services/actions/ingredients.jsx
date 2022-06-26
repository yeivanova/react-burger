export const GET_INGREDIENTS_REQUEST = "INGREDIENTS/GET_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "INGREDIENTS/GET_SUCCESS";
export const GET_INGREDIENTS_FAILED = "INGREDIENTS/GET_FAILED";
export const CHANGE_TAB = "CHANGE_TAB";

export function getIngredientsRequest() {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
}

export function getIngredientsSuccess(data) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    items: data,
  };
}

export function getIngredientsFailed() {
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
