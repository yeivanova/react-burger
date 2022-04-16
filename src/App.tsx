import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/header.js";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "./components/burger-constructor/burger-constructor.js";
import { data } from "./utils/data";

function App() {
  const state = {
    cart: [
      {
        id: 1,
        _id: "60666c42cc7b410027a1a9b1",
        name: "Краторная булка N-200i (верх)",
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        count: 1,
        price: 200,
      },
      {
        id: 2,
        _id: "60666c42cc7b410027a1a9b9",
        name: "Соус традиционный галактический",
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        count: 1,
        price: 15,
      },
      {
        id: 3,
        _id: "60666c42cc7b410027a1a9b4",
        name: "Мясо бессмертных моллюсков Protostomia",
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        count: 1,
        price: 1337,
      },
      {
        id: 4,
        _id: "60666c42cc7b410027a1a9bc",
        name: "Плоды Фалленианского дерева",
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        count: 1,
        price: 874,
      },
      {
        id: 5,
        _id: "60666c42cc7b410027a1a9bb",
        name: "Хрустящие минеральные кольца",
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        count: 3,
        price: 300,
      },
      {
        id: 6,
        _id: "60666c42cc7b410027a1a9b1",
        name: "Краторная булка N-200i (низ)",
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        count: 1,
        price: 200,
      },
    ],
  };

  const total = state.cart.reduce((acc, p) => acc + p.price * p.count, 0);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="page-container pl-4 pr-4">
          <div className="column pb-10">
            <BurgerIngredients cart={state.cart} data={data} />
          </div>
          <div className="column pb-10">
            <BurgerConstructor cart={state.cart} total={total} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
