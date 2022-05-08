import { combineReducers } from "redux";
import { constructorReducer, totalReducer } from "./constructor";
import { ingredientsReducer, tabReducer } from "./ingredients";
import { viewedIngredientReducer } from "./viewed-ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  cartItems: constructorReducer,
  total: totalReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentTab: tabReducer,
  viewedIngredient: viewedIngredientReducer,
});
