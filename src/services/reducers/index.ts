import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer, tabReducer } from "./ingredients";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { wsReducer } from "./ws";
import { wsAuthReducer } from "./ws-auth";

export const rootReducer = combineReducers({
  cartItems: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentTab: tabReducer,
  user: userReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer,
});
