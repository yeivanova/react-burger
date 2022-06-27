import uuid from "react-uuid";

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SET_BUN = "SET_BUN";
export const SORT_ITEMS = "SORT_ITEMS";
export const CART_RESET = "CART_RESET";

export function addItem(item) {
  item.item.uuid = uuid();
  return {
    type: ADD_ITEM,
    ...item,
  };
}

export function setBun(item) {
  return {
    type: SET_BUN,
    ...item,
  };
}

export function sortItems(changedCartItems) {
  return {
    type: SORT_ITEMS,
    cartItems: changedCartItems,
  };
}

export function cartReset() {
  return {
    type: CART_RESET,
  };
}
