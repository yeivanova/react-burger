import React, { FC, MouseEventHandler } from "react";
import styles from "./ingredient-item.module.scss";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { TIngredient } from "../../services/types/data";

type TProps = {
  item: TIngredient;
  customClickEvent?: MouseEventHandler<HTMLLIElement>;
  count: number;
};

export const IngredientItem: FC<TProps> = ({
  item,
  customClickEvent,
  count,
}) => {
  const location = useLocation();
  const [{ dragEffect }, ref] = useDrag({
    type: "items",
    item: { item },
    collect: (monitor) => ({
      dragEffect: monitor.isDragging(),
    }),
  });

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
      <Link
        className={styles.link}
        to={{
          pathname: `ingredients/${item._id}`,
          state: { isModal: location },
        }}
      >
        {count > 0 && <Counter count={count} size="default" />}
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
        <div
          className={`${styles.ingredient_name} text text_type_main-default`}
        >
          {item.name}
        </div>
      </Link>
    </li>
  );
};
