import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./app.module.scss";
import Header from "../header/header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { data } from "../../utils/data";
import { cart } from "../../utils/mock-order";

function App() {
  const total = cart.reduce((acc, p) => acc + p.price * p.count, 0);

  return (
    <div className={`${styles.app}`}>
      <Header />
      <main>
        <div className={`${styles.page_container} pl-4 pr-4`}>
          <div className={`${styles.column} pb-10`}>
            <BurgerIngredients cart={cart} data={data} />
          </div>
          <div className={`${styles.column} pb-10`}>
            <BurgerConstructor cart={cart} total={total} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
