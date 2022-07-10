import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_TAB,
} from "../constants/ingredients";
import { SetStateAction } from "react";
import { TIngredient } from "../types/data";
import { TActionCreator } from "../types/index";

export type TGetIngredientsRequest = { type: typeof GET_INGREDIENTS_REQUEST };

export type TGetIngredientsSuccess = TActionCreator<
  typeof GET_INGREDIENTS_SUCCESS,
  ReadonlyArray<TIngredient>
>;
export type TGetIngredientsFailed = {
  type: typeof GET_INGREDIENTS_FAILED;
};
export type TChangeTabAction = TActionCreator<
  typeof CHANGE_TAB,
  SetStateAction<string>
>;

export type TIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsFailed;

export const getIngredientsRequest = (): TGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (
  data: ReadonlyArray<TIngredient>
): TGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
});

export const getIngredientsFailed = (): TGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED,
});

export const changeTab = (
  currentTab: SetStateAction<string>
): TChangeTabAction => ({
  type: CHANGE_TAB,
  payload: currentTab,
});
