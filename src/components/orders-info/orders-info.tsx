import React, { FC, useContext } from "react";
import styles from "./orders-info.module.scss";
import { TWsOrder } from "../../services/types/data";
import { v4 as uuid } from "uuid";
import { MobileContext } from "../../services/app-context";

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
  const { isMobile } = useContext(MobileContext);
  const ordersToShow = isMobile ? 5 : 20;
  const ordersNumbersDone = orders
    .filter((item) => item.status === "done")
    .map((item) => item.number)
    .slice(0, ordersToShow);

  const ordersNumbersUndone = orders
    .filter((item) => item.status === "pending")
    .map((item) => item.number)
    .slice(0, ordersToShow);

  return (
    <>
      <section className={`${styles.status} mb-15`}>
        <div className={`${styles.status_column} mr-9`}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={`${styles.status_column_inner} mt-6`}>
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
            <p className="text text_type_main-medium">В работе:</p>
            <ul className={`${styles.status_column_inner} mt-6`}>
              {ordersNumbersUndone.map((number) => (
                <li className="text text_type_digits-default mb-2" key={uuid()}>
                  {number}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className={`${styles.status} mb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <div className="text text_type_digits-large">{total}</div>
      </section>
      <section>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <div className="text text_type_digits-large">{totalToday}</div>
      </section>
    </>
  );
};
