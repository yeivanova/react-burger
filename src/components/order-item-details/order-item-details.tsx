import React, { FC, useContext, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item-details.module.scss";
import { Preloader } from "../preloader/preloader";
import { useSelector, useDispatch } from "../../services/hooks";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router";
import {
  WsOrderConnectionStart,
  WsOrderConnectionClosed,
} from "../../services/actions/ws";
import {
  WsProfileConnectionStart,
  WsProfileConnectionClosed,
} from "../../services/actions/ws-auth";
import { getDateFormat } from "../../utils/utils";
import { MobileContext } from "../../services/app-context";

type TOrderItemDetailsProps = {
  isAuthOrders: boolean;
};

export const OrderItemDetails: FC<TOrderItemDetailsProps> = ({
  isAuthOrders,
}) => {
  const { items } = useSelector((store) => ({
    items: store.ingredients.items,
  }));

  const { wsConnected, orders, isError } = useSelector((store) => ({
    wsConnected: isAuthOrders ? store.wsAuth.wsConnected : store.ws.wsConnected,
    orders: isAuthOrders ? store.wsAuth.orders : store.ws.orders,
    isError: isAuthOrders ? store.wsAuth.isError : store.ws.isError,
  }));

  const { isMobile } = useContext(MobileContext);
  const orderId = useParams<{ id: string }>().id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthOrders) {
      if (!wsConnected) {
        dispatch(WsProfileConnectionStart());
      }

      return () => {
        if (wsConnected) {
          dispatch(WsProfileConnectionClosed());
        }
      };
    } else {
      if (!wsConnected) {
        dispatch(WsOrderConnectionStart());
      }

      return () => {
        if (wsConnected) {
          dispatch(WsOrderConnectionClosed());
        }
      };
    }
  }, [dispatch, wsConnected, isAuthOrders]);

  let order, orderItems, total, element;

  let countById: { [key: string]: number } = {};
  if (wsConnected) {
    order = orders.find((el) => el._id === orderId);

    if (typeof order !== "undefined") {
      let uniqueIngredients = Array.from(new Set(order.ingredients));
      orderItems = uniqueIngredients
        .map((id) => items.filter((el) => el._id === id))
        .flat();
      total = orderItems.reduce((sum, val) => sum + val.price, 0);

      for (element of order.ingredients) {
        if (countById[element]) {
          countById[element] += 1;
        } else {
          countById[element] = 1;
        }
      }
    }
  }

  return (
    <div className={`${styles.order} pt-10 pb-10`}>
      {isError ? (
        <div className="text text_type_main-large mt-10 mb-5">
          Ошибка при загрузке данных.
        </div>
      ) : !wsConnected || typeof order === "undefined" ? (
        <Preloader />
      ) : (
        <>
          {isMobile && (
            <p className={`${styles.modal_header} text text_type_main-large`}>
              Детали заказа
            </p>
          )}
          <p className={`${styles.number} text text_type_digits-default mb-10`}>
            #{order.number}
          </p>
          <p className="text text_type_main-medium mb-3">{order.name}</p>
          {typeof order.status !== "undefined" && (
            <div
              className={`${styles.status} ${
                order.status === "done" && styles.done
              } mb-15`}
            >
              {order.status === "done"
                ? "Выполнен"
                : "pending"
                ? "Готовится"
                : "Отменен"}
            </div>
          )}
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div id="wrapper" className={`${styles.column_inner} mb-10`}>
            <ul className={styles.list}>
              {orderItems?.map((el) => (
                <li className={`${styles.item} mb-4`} key={uuid()}>
                  <div className={styles.img_wrapper}>
                    <img
                      className={styles.img}
                      src={el.image_mobile}
                      alt={el.name}
                    />
                  </div>
                  <span
                    className={`${styles.name} text text_type_main-default`}
                  >
                    {el.name}
                  </span>
                  <span
                    className={`${styles.price} text text_type_digits-default`}
                  >
                    {countById[el._id]} x {el.price}
                    <CurrencyIcon type="primary" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.info}`}>
            <span className="text text_type_main-default text_color_inactive">
              {getDateFormat(order.createdAt)}
            </span>
            <span
              className={`${styles.total_price} text text_type_digits-default`}
            >
              {total} <CurrencyIcon type="primary" />
            </span>
          </div>
        </>
      )}
    </div>
  );
};
