import React from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Preloader from "../components/preloader/preloader.js";
import IngredientDetails from "../components/ingredient-details/ingredient-details.js";
import styles from "./ingredient.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function IngredientPage() {
  const { items, itemsRequest, itemsFailed } = useSelector((store) => ({
    items: store.ingredients.items,
    itemsRequest: store.ingredients.itemsRequest,
    itemsFailed: store.ingredients.itemsFailed,
  }));

  const ingredientId = useParams().id;
  const ingredient = items.find(({ _id }) => _id === ingredientId);
  const location = useLocation();

  if (items.length > 0 && !ingredient) {
    return <Redirect to={location.state?.from || "/404"} />;
  }

  return (
    <>
      {itemsFailed ? (
        <div className="text text_type_main-large mt-10 mb-5">
          Ошибка при загрузке данных.
        </div>
      ) : itemsRequest ? (
        <Preloader />
      ) : (
        <div className={`${styles.page_container} pl-4 pr-4 pt-15`}>
          <h1 className="text text_type_main-large mb-6">Детали ингредиента</h1>
          {ingredient && (
            <IngredientDetails
              item={items.find((item) => item._id === ingredientId)}
            />
          )}
        </div>
      )}
    </>
  );
}
