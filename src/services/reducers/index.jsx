import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer, tabReducer } from "./ingredients";
import { viewedIngredientReducer } from "./viewed-ingredient";
import { orderReducer } from "./order";

// const initialState = {
//   items: [],
//   constructorItems: [],
//   currentIngredient: undefined,
//   order: undefined,
// };

export const rootReducer = combineReducers({
  cartItems: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentTab: tabReducer,
  viewedIngredient: viewedIngredientReducer,
});
