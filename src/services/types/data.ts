export type TLocationState = {
  from: { pathname: string };
  isModal: boolean;
  isModalOrder: boolean;
  isModalAuthOrder: boolean;
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

export type TUserReq = {
  email?: string | null;
  name?: string | null;
  password?: string | null;
};

export interface IValues {
  [key: string]: string;
}

export type TFetchOptions = {
  method: string;
  headers: IValues;
  body?: string;
};

export type TWsOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TWsOrders = {
  orders: Array<TWsOrder>;
  total: number | null;
  totalToday: number | null;
};
