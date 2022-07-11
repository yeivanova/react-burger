import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Preloader } from "../components/preloader/preloader";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "../services/hooks";
import { TLocationState } from "../services/types/data";

export const IngredientPage: FC = () => {
  const { items, itemsRequest, itemsFailed } = useSelector((store) => ({
    items: store.ingredients.items,
    itemsRequest: store.ingredients.itemsRequest,
    itemsFailed: store.ingredients.itemsFailed,
  }));

  const ingredientId = useParams<{ id: string }>().id;
  const ingredient = items.find(
    (item: { _id: string }) => item._id === ingredientId
  );
  const location = useLocation<TLocationState>();

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
          {ingredient && <IngredientDetails />}
        </div>
      )}
    </>
  );
};
