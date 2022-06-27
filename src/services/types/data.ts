import { store } from "../store";

export type TLocationState = {
  from: { pathname: string };
  isModal: boolean;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
  proteins: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  uuid?: string;
};

export type AppDispatch = typeof store.dispatch;

export interface IUserReq {
  email: string;
  name: string;
  password: string;
}

export interface IValues {
  [key: string]: string;
}

export type TFetchOptions = {
  method: string;
  headers: IValues;
  body?: string;
};
