import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_BUN,
  SORT_ITEMS,
  SET_TOTAL,
  RESET_TOTAL,
} from "../actions/constructor";

const cartInitialState = {
  cartItems: [],
  bunItem: [],
  total: 0,
};

export const totalReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case SET_TOTAL:
      let bunPrice = action.bunItem !== undefined ? action.bunItem * 2 : 0;
      let total = bunPrice;
      action.cartItems.forEach((el) => {
        total = total + el;
      });
      return {
        ...state,
        total: total,
      };
    case RESET_TOTAL:
      return {
        ...state,
        total: 0,
      };
    default:
      return state;
  }
};

export const constructorReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        cartItems: [...state.cartItems, Object.assign({}, action.item)],
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        cartItems: [...state.cartItems].filter(
          (item) => item.cartItemId !== action.item.cartItemId
        ),
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bunItem: action.item,
      };
    }
    case SORT_ITEMS: {
      return {
        ...state,
        cartItems: action.cartItems,
      };
    }
    default:
      return state;
  }
};
