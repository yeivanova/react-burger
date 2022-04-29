import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-item.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropTypes } from "../../utils/prop-types.js";

function IngredientItem({ item, cart, customClickEvent }) {
  let counter = 0;
  cart.forEach((el) => {
    item._id === el && ++counter;
  });

  return (
    <li
      className={`${styles.ingredient_item} mb-8`}
      id={item._id}
      onClick={customClickEvent}
      key={item._id}
    >
      {counter > 0 && <Counter count={counter} size="default" />}
      <img
        className={`${styles.ingredient_image}`}
        src={item.image}
        alt={item.name}
      />
      <div
        className={`${styles.ingredient_price} text_type_digits-default mt-1 mb-1`}
      >
        {item.price} <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.ingredient_name} text text_type_main-default`}>
        {item.name}
      </div>
    </li>
  );
}

IngredientItem.propTypes = {
  item: IngredientPropTypes.isRequired,
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
  customClickEvent: PropTypes.func.isRequired,
};

export default React.memo(IngredientItem);
