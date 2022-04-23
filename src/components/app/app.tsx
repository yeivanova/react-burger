import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./app.module.scss";
import Header from "../header/header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { cartData } from "../../utils/mock-order";

function App() {
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState([] as any[]);

  const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        setSuccess(true);
        setItems(result.data);
      })
      .catch((error) => {
        setSuccess(true);
        setError(error);
      });
  }, []);

  return (
    <div className={`${styles.app}`}>
      <Header />
      <main>
        <div className={`${styles.page_container} pl-4 pr-4`}>
          {error ? (
            <div>Ошибка: {error.message}</div>
          ) : !success ? (
            <div>Загрузка...</div>
          ) : (
            <>
              <div className={`${styles.column} pb-10`}>
                <BurgerIngredients cart={cartData} items={items} />
              </div>
              <div className={`${styles.column} pb-10`}>
                <BurgerConstructor items={items} cart={cartData} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

App.propTypes = {
  error: PropTypes.string,
};

export default App;
