import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-item.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem({ item, cart, customClickEvent }) {
  let counter = 0;
  return (
    <li
      className={`${styles.ingredient_item} mb-8`}
      id={item._id}
      onClick={customClickEvent}
    >
      {cart.map((cartItem, index) =>
        item._id === cartItem ? (
          <Counter count={++counter} size="default" key={index} />
        ) : (
          ""
        )
      )}
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
  item: PropTypes.object.isRequired,
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
  customClickEvent: PropTypes.func.isRequired,
};

export default IngredientItem;
