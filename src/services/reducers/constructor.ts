import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_BUN,
  SORT_ITEMS,
  CART_RESET,
} from "../constants/constructor";
import { TIngredient } from "../types/data";
import type { TConstructorActions } from "../actions/constructor";

type TCartState = {
  cartItems: ReadonlyArray<TIngredient>;
  bunItem: TIngredient | null;
};

const cartInitialState: TCartState = {
  cartItems: [],
  bunItem: null,
};

export const constructorReducer = (
  state: TCartState = cartInitialState,
  action: TConstructorActions
): TCartState => {
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
        cartItems: [...state.cartItems, Object.assign({}, action.payload)],
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        cartItems: [...state.cartItems].filter(
          (item) => item !== action.payload
        ),
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bunItem: action.payload,
      };
    }
    case SORT_ITEMS: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    default:
      return state;
  }
};
