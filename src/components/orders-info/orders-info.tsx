import React, { FC } from "react";
import styles from "./orders-info.module.scss";
import { TWsOrder } from "../../services/types/data";
import { v4 as uuid } from "uuid";

type TOrdersInfoProps = {
  orders: Array<TWsOrder>;
  total: number | null;
  totalToday: number | null;
};

export const OrdersInfo: FC<TOrdersInfoProps> = ({
  orders,
  total,
  totalToday,
}) => {
  const ordersNumbersDone = orders
    .filter((item) => item.status === "done")
    .map((item) => item.number)
    .slice(0, 20);

  const ordersNumbersUndone = orders
    .filter((item) => item.status === "pending")
    .map((item) => item.number)
    .slice(0, 20);

  return (
    <>
      <section className={`${styles.status} pb-15`}>
        <div className={`${styles.status_column} mr-9`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={styles.status_column_inner}>
            {ordersNumbersDone.map((number) => (
              <li
                className={`${styles.number} text text_type_digits-default mb-2`}
                key={uuid()}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
        {ordersNumbersUndone.length > 0 && (
          <div className={`${styles.status_column}`}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <ul className={styles.status_column_inner}>
              {ordersNumbersUndone.map((number) => (
                <li className="text text_type_digits-default mb-2" key={uuid()}>
                  {number}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className="pb-15">
        <p className="text text_type_main-medium mb-6">
          Выполнено за все время:
        </p>
        <div className="text text_type_digits-large">{total}</div>
      </section>
      <section>
        <p className="text text_type_main-medium mb-6">Выполнено за сегодня:</p>
        <div className="text text_type_digits-large">{totalToday}</div>
      </section>
    </>
  );
};
