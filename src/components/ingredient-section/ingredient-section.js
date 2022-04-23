import React from "react";
import PropTypes from "prop-types";

import styles from "./ingredient-section.module.scss";

function IngredientSection(props) {
  return (
    <section className="pb-2">
      <h2 className="text text_type_main-medium mb-6">{props.sectionTitle}</h2>
      <ul className={`${styles.ingredient_list}`}>{props.children}</ul>
    </section>
  );
}

IngredientSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default IngredientSection;
