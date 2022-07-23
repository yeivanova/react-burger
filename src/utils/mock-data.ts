import {
  TIngredient,
  TUserReq,
  TWsOrder,
  TWsOrders,
} from "../services/types/data";

export const testIngredient: TIngredient = {
  _id: "60d3b41abdacab0026a733c8",
  name: "Филе Люминесцентного тетраодонтимформа",
  type: "main",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  uuid: "0",
};

export const testBun: TIngredient = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  uuid: "0",
};

export const testOneMoreIngredient: TIngredient = {
  _id: "60d3b41abdacab0026a733cb",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
};

export const testOrder = [testBun, testIngredient];

export const testUser: TUserReq = {
  email: "user@test.com",
  name: "Test Name",
};

export const testWSOrder: TWsOrder = {
  createdAt: "2022-07-19T13:53:50.102Z",
  ingredients: [
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733cf",
    "60d3b41abdacab0026a733cb",
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733c7",
  ],
  name: "Space антарианский био-марсианский флюоресцентный бургер",
  number: 20625,
  price: 2568,
  status: "done",
  updatedAt: "2022-07-19T13:53:50.385Z",
  _id: "62d6b76e42d34a001c279ec8",
};

export const testWSMessage: TWsOrders = {
  orders: [testWSOrder],
  total: 42,
  totalToday: 420,
};
