import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item.js";
import styles from "./ingredient-section.module.scss";

function IngredientSection({ sectionTitle, type, data, cart }) {
  return (
    <section className="pt-6">
      <h2 className="text text_type_main-medium mb-6">{sectionTitle}</h2>
      <ul className={`${styles.ingredient_list}`}>
        {data
          .filter((item) => item.type === type)
          .map((item, index) => (
            <IngredientItem data={item} cart={cart} key={item._id} />
          ))}
      </ul>
    </section>
  );
}

IngredientSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientSection;
