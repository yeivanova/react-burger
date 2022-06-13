import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_BUN,
  SORT_ITEMS,
  CART_RESET,
} from "../actions/constructor";

const cartInitialState = {
  cartItems: [],
  bunItem: null,
};

export const constructorReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case CART_RESET: {
      return {
        ...state,
        cartItems: [],
        bunItem: null,
      };
    }
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
