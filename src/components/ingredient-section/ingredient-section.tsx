import React, { FC } from "react";
import styles from "./ingredient-section.module.scss";

type TIngredientSectionProps = {
  sectionTitle: string;
  children: JSX.Element | JSX.Element[];
};

export const IngredientSection: FC<TIngredientSectionProps> = ({
  sectionTitle,
  children,
}) => {
  return (
    <section className="pb-2">
      <h2 className="text text_type_main-medium mb-6">{sectionTitle}</h2>
      <ul className={`${styles.ingredient_list}`}>{children}</ul>
    </section>
  );
};
