import { store } from "../store";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions, TChangeTabAction } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TWsActions } from "../actions/ws";
import { TWsAuthActions } from "../actions/ws-auth";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { rootReducer } from "../reducers";

export type TActionCreator<Type, Payload> = {
  readonly type: Type;
  readonly payload: Payload;
};

export type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TChangeTabAction
  | TWsActions
  | TWsAuthActions;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type TAppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
