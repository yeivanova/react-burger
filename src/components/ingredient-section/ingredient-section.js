import React from "react";
import IngredientItem from "../ingredient-item/ingredient-item.js";
import styles from "./ingredient-section.module.scss";

function IngredientSection({ data, sectionTitle, type, cart }) {
  return (
    <section className="pt-6">
      <h2 className="text text_type_main-medium mb-6">{sectionTitle}</h2>
      <ul className={`${styles.ingredient_list}`}>
        {data
          .filter((item) => item.type === type)
          .map((item, index) => (
            <IngredientItem data={item} cart={cart} />
          ))}
      </ul>
    </section>
  );
}

export default IngredientSection;
