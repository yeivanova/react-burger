import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./app.module.scss";
import Header from "../header/header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import Preloader from "../preloader/preloader.js";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../../services/actions/ingredients";

function App() {
  const { itemsRequest, itemsFailed } = useSelector((store) => ({
    itemsRequest: store.ingredients.itemsRequest,
    itemsFailed: store.ingredients.itemsFailed,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <div className={`${styles.app}`}>
      <Header />
      <main>
        <div className={`${styles.page_container} pl-4 pr-4`}>
          {itemsFailed ? (
            <div className="text text_type_main-large mt-10 mb-5">
              Ошибка при загрузке данных.
            </div>
          ) : itemsRequest ? (
            <Preloader />
          ) : (
            <>
              <div className={`${styles.column} pb-10`}>
                <BurgerIngredients />
              </div>
              <div className={`${styles.column} pb-10`}>
                <BurgerConstructor />
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
