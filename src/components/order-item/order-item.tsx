import React, { FC, useMemo, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.scss";
import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";
import { v4 as uuid } from "uuid";
import { getDateFormat } from "../../utils/utils";

type TOrderDetailsProps = {
  item: {
    name: string;
    ingredients: string[];
    _id: string;
    status?: string | undefined;
    number: number;
    createdAt: string;
    updatedAt: string;
  };
};

export const OrderItem: FC<TOrderDetailsProps> = ({ item }) => {
  const { items } = useSelector((store) => ({
    items: store.ingredients.items,
  }));

  const orderItems = item.ingredients
    .slice(0, 6)
    .map((id) => items.filter((el) => el._id === id))
    .flat();
  const lastIteem = orderItems.pop();
  const quantity = item.ingredients.length - orderItems.length - 1;

  const orderPrice = useMemo(() => {
    const order = item.ingredients
      .map((id) => items.filter((el) => el._id === id))
      .flat();

    return order.reduce((sum, val) => sum + val.price, 0);
  }, [item.ingredients, items]);

  return (
    <>
      <div className={`${styles.info} mb-6`}>
        <span className="text text_type_digits-default">#{item.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {getDateFormat(item.createdAt)}
        </span>
      </div>
      <p className="text text_type_main-medium mb-2">{item.name}</p>
      {typeof item.status !== "undefined" && (
        <div className={`${item.status === "done" && styles.done} mb-6`}>
          {item.status === "done"
            ? "Выполнен"
            : "pending"
            ? "Готовится"
            : "Отменен"}
        </div>
      )}
      <div className={styles.info}>
        <ul className={styles.order_preview}>
          {orderItems.map((ingredient) => (
            <li className={styles.preview_item} key={uuid()}>
              <img
                className={styles.preview_img}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
            </li>
          ))}
          <li
            className={`${styles.preview_item} ${
              quantity !== 6 && styles.preview_item_last
            }`}
          >
            <img src={lastIteem!.image_mobile} alt={lastIteem!.name} />
            <span
              className={`${styles.more_items} text text_type_main-default`}
            >
              {quantity > 0 && `+${quantity}`}
            </span>
          </li>
        </ul>
        <span className="text text_type_digits-default">
          {orderPrice} <CurrencyIcon type="primary" />
        </span>
      </div>
    </>
  );
};
