import React from "react";
import PropTypes from "prop-types";

import styles from "./ingredient-section.module.scss";

function IngredientSection({ sectionTitle, children }) {
  return (
    <section className="pb-2">
      <h2 className="text text_type_main-medium mb-6">{sectionTitle}</h2>
      <ul className={`${styles.ingredient_list}`}>{children}</ul>
    </section>
  );
}

IngredientSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default React.memo(IngredientSection);
