import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_TAB,
} from "../constants/ingredients";
import { SetStateAction } from "react";
import { TIngredient } from "../types/data";
import type {
  TIngredientsActions,
  TChangeTabAction,
} from "../actions/ingredients";

type TIngredientsState = {
  items: ReadonlyArray<TIngredient>;
  itemsRequest: boolean;
  itemsFailed: boolean;
};

type TIngredientsStateTab = {
  currentTab: SetStateAction<string>;
};

const initialState: TIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

const initialStateTab: TIngredientsStateTab = {
  currentTab: "bun",
};

export const ingredientsReducer = (
  state: TIngredientsState = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        itemsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
      };
    }
    default:
      return state;
  }
};

export const tabReducer = (
  state: TIngredientsStateTab = initialStateTab,
  action: TChangeTabAction
): TIngredientsStateTab => {
  switch (action.type) {
    case CHANGE_TAB: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }
    default:
      return state;
  }
};
