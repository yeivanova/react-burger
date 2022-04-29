import React from "react";
import styles from "./ingredient-details.module.scss";
import { IngredientPropTypes } from "../../utils/prop-types.js";

function IngredientDetails({ item }) {
  return (
    <div className="pb-15">
      <img
        className={`${styles.ingredient_image}`}
        src={item.image_large}
        alt={item.name}
        width="480"
        height="240"
      />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <div
        className={`${styles.ingredient_details} text text_type_main-default text_color_inactive`}
      >
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </div>
          <div className="ttext text_type_main-medium text_color_inactive">
            {item.calories}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="ttext text_type_main-medium text_color_inactive">
            {item.proteins}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="ttext text_type_main-medium text_color_inactive">
            {item.fat}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </div>
          <div className="ttext text_type_main-medium text_color_inactive">
            {item.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: IngredientPropTypes.isRequired,
};

export default IngredientDetails;
