import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./app.module.scss";
import Header from "../header/header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import Preloader from "../preloader/preloader.js";
import { cartData } from "../../utils/mock-order";
import { ItemsContext } from "../../services/burger-context";
import { getIngredients } from "../../utils/burger-api.js";

function App() {
  const [error] = useState<any>();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIngredients()
      .then(setItems)
      .catch(() => console.error("Ошибка в получении данных."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={`${styles.app}`}>
      <Header />
      <main>
        <div className={`${styles.page_container} pl-4 pr-4`}>
          {error && <div>Ошибка: {error.message}</div>}
          {isLoading ? (
            <Preloader />
          ) : (
            <ItemsContext.Provider value={items}>
              <div className={`${styles.column} pb-10`}>
                <BurgerIngredients cart={cartData} />
              </div>
              <div className={`${styles.column} pb-10`}>
                <BurgerConstructor cart={cartData} />
              </div>
            </ItemsContext.Provider>
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
