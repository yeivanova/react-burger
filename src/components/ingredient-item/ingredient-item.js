import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-item.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropTypes } from "../../utils/prop-types.js";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

function IngredientItem({ item, customClickEvent }) {
  const { cartItems, bunItem } = useSelector((store) => ({
    cartItems: store.cartItems.cartItems,
    bunItem: store.cartItems.bunItem,
  }));

  const [{ dragEffect }, ref] = useDrag({
    type: "items",
    item: { item },
    collect: (monitor) => ({
      dragEffect: monitor.isDragging(),
    }),
  });

  let counter = 0;
  cartItems.forEach((el) => {
    item._id === el._id && ++counter;
  });

  bunItem._id === item._id && ++counter;

  return (
    <li
      className={`${styles.ingredient_item} ${
        dragEffect ? styles.drag_effect : ""
      } mb-8`}
      id={item._id}
      onClick={customClickEvent}
      key={item._id}
      ref={ref}
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
  customClickEvent: PropTypes.func.isRequired,
};

export default React.memo(IngredientItem);
