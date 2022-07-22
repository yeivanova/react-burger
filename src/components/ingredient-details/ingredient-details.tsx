import React, { FC } from "react";
import styles from "./ingredient-details.module.scss";
import { Preloader } from "../preloader/preloader";
import { useParams } from "react-router";
import { useSelector } from "../../services/hooks";

export const IngredientDetails: FC = () => {
  const { items } = useSelector((store) => ({
    items: store.ingredients.items,
  }));

  const ingredientId = useParams<{ id: string }>().id;
  const ingredient = items.find(
    (item: { _id: string }) => item._id === ingredientId
  );

  return ingredient ? (
    <div className={`${styles.details_wrapper} pb-15`}>
      <img
        className={`${styles.ingredient_image}`}
        src={ingredient.image_large}
        alt={ingredient.name}
        width="480"
        height="240"
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <div
        className={`${styles.ingredient_details} text text_type_main-default text_color_inactive`}
      >
        <div className={styles.ingredient_details_item}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </div>
          <div className="text text_type_main-medium text_color_inactive">
            {ingredient.calories}
          </div>
        </div>
        <div className={styles.ingredient_details_item}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="text text_type_main-medium text_color_inactive">
            {ingredient.proteins}
          </div>
        </div>
        <div className={styles.ingredient_details_item}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="text text_type_main-medium text_color_inactive">
            {ingredient.fat}
          </div>
        </div>
        <div className={styles.ingredient_details_item}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </div>
          <div className="text text_type_main-medium text_color_inactive">
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Preloader />
  );
};
