import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-item.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem({ data, cart }) {
  return (
    <li className={`${styles.ingredient_item} mb-8`}>
      {cart.map((item, index) =>
        data._id === item._id ? (
          <Counter count={item.count} size="default" />
        ) : (
          ""
        )
      )}
      <img
        className={`${styles.ingredient_image}`}
        src={data.image}
        alt={data.name}
      />
      <div
        className={`${styles.ingredient_price} text_type_digits-default mt-1 mb-1`}
      >
        {data.price} <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.ingredient_name} text text_type_main-default`}>
        {data.name}
      </div>
    </li>
  );
}

IngredientItem.propTypes = {
  data: PropTypes.object.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientItem;
