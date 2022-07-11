import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_BUN,
  SORT_ITEMS,
  CART_RESET,
} from "../constants/constructor";
import { TIngredient } from "../types/data";
import { TActionCreator } from "../types/index";
import { v4 as uuid } from "uuid";

export type TAddItemAction = TActionCreator<typeof ADD_ITEM, TIngredient>;
export type TDeleteItemAction = TActionCreator<typeof DELETE_ITEM, TIngredient>;
export type TSetBunAction = TActionCreator<typeof SET_BUN, TIngredient>;
export type TSortItemsAction = TActionCreator<
  typeof SORT_ITEMS,
  ReadonlyArray<TIngredient>
>;
export type TCartResetAction = {
  readonly type: typeof CART_RESET;
};

export type TConstructorActions =
  | TAddItemAction
  | TDeleteItemAction
  | TSetBunAction
  | TSortItemsAction
  | TCartResetAction;

export const addItem = (payload: TIngredient): TAddItemAction => {
  payload.uuid = uuid();
  return {
    type: ADD_ITEM,
    payload,
  };
};

export const deleteItem = (payload: TIngredient): TDeleteItemAction => ({
  type: DELETE_ITEM,
  payload,
});

export const setBun = (payload: TIngredient): TSetBunAction => ({
  type: SET_BUN,
  payload,
});

export const sortItems = (
  payload: ReadonlyArray<TIngredient>
): TSortItemsAction => ({
  type: SORT_ITEMS,
  payload,
});

export const cartReset = (): TCartResetAction => ({
  type: CART_RESET,
});
