import React, { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Preloader } from "../../components/preloader/preloader";
import { OrderItem } from "../../components/order-item/order-item";
import { OrdersInfo } from "../../components/orders-info/orders-info";
import styles from "./feed.module.scss";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  WsOrderConnectionStart,
  WsOrderConnectionClosed,
} from "../../services/actions/ws";
import { v4 as uuid } from "uuid";

export const FeedPage: FC = () => {
  const { wsConnected, orders, error, total, totalToday } = useSelector(
    (store) => ({
      wsConnected: store.ws.wsConnected,
      orders: store.ws.orders,
      error: store.ws.error,
      total: store.ws.total,
      totalToday: store.ws.totalToday,
    })
  );

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wsConnected) {
      dispatch(WsOrderConnectionStart());
    }
    return () => {
      if (wsConnected) {
        dispatch(WsOrderConnectionClosed());
      }
    };
  }, [dispatch, wsConnected]);

  return (
    <>
      <div className={`${styles.page_container} pt-10 pl-4 pr-4`}>
        {error ? (
          <div className="text text_type_main-large mt-10 mb-5">
            Ошибка при загрузке данных.
          </div>
        ) : !wsConnected ? (
          <Preloader />
        ) : (
          <>
            <div className={`${styles.column} pb-10`}>
              <section className="pb-2">
                <h2 className="text text_type_main-large mb-5">
                  Лента заказов
                </h2>
                <div id="wrapper" className={`${styles.column_inner}`}>
                  <ul className={`${styles.orders_list}`}>
                    {orders.map((item) => (
                      <li
                        className={`${styles.order_item} p-6 mb-4`}
                        key={item._id}
                      >
                        <Link
                          className={styles.link}
                          to={{
                            pathname: `/feed/${item._id}`,
                            state: { isModalOrder: location },
                          }}
                        >
                          <OrderItem orderItem={item} key={uuid()} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
            <div className={`${styles.column} pl-5 pt-20 pb-10`}>
              <OrdersInfo
                orders={orders}
                total={total}
                totalToday={totalToday}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
