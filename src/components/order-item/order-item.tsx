import React, { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.scss";
import { useSelector } from "../../services/hooks";
import { v4 as uuid } from "uuid";
import { getDateFormat } from "../../utils/utils";

type TOrderDetailsProps = {
  orderItem: {
    name: string;
    ingredients: string[];
    _id: string;
    status?: string | undefined;
    number: number;
    createdAt: string;
    updatedAt: string;
  };
};

export const OrderItem: FC<TOrderDetailsProps> = ({ orderItem }) => {
  const { items } = useSelector((store) => ({
    items: store.ingredients.items,
  }));

  const orderInfo = useMemo(() => {
    if (!items.length) return null;
    const orderItems = orderItem.ingredients
      .slice(0, 6)
      .map((id) => items.filter((el) => el._id === id))
      .flat();
    const lastIteem = orderItems.pop();
    const quantity = orderItem.ingredients.length - orderItems.length - 1;

    const order = orderItem.ingredients
      .map((id) => items.filter((el) => el._id === id))
      .flat();

    const orderPrice = order.reduce((sum, val) => sum + val.price, 0);
    return { ...orderItem, orderItems, lastIteem, quantity, order, orderPrice };
  }, [orderItem, items]);

  if (!orderInfo) return null;

  return (
    <>
      <div className={`${styles.info} mb-6`}>
        <span className="text text_type_digits-default">
          #{orderItem.number}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {getDateFormat(orderItem.createdAt)}
        </span>
      </div>
      <p className="text text_type_main-medium mb-2">{orderItem.name}</p>
      {typeof orderItem.status !== "undefined" && (
        <div className={`${orderItem.status === "done" && styles.done} ${styles.status} mb-6`}>
          {orderItem.status === "done"
            ? "Выполнен"
            : "pending"
            ? "Готовится"
            : "Отменен"}
        </div>
      )}
      <div className={styles.info}>
        <ul className={styles.order_preview}>
          {orderInfo.orderItems.map((ingredient) => (
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
              orderInfo.quantity !== 6 && styles.preview_item_last
            }`}
          >
            <img
              src={orderInfo.lastIteem!.image_mobile}
              alt={orderInfo.lastIteem!.name}
            />
            <span
              className={`${styles.more_items} text text_type_main-default`}
            >
              {orderInfo.quantity > 0 && `+${orderInfo.quantity}`}
            </span>
          </li>
        </ul>
        <span className="text text_type_digits-default">
          {orderInfo.orderPrice} <CurrencyIcon type="primary" />
        </span>
      </div>
    </>
  );
};
