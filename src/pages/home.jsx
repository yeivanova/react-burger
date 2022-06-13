import React from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.js";
import Preloader from "../components/preloader/preloader.js";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";

export function HomePage() {
  const { itemsRequest, itemsFailed } = useSelector((store) => ({
    itemsRequest: store.ingredients.itemsRequest,
    itemsFailed: store.ingredients.itemsFailed,
  }));

  return (
    <>
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
    </>
  );
}
