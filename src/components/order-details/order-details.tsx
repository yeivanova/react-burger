import React, { FC } from "react";
import styles from "./order-details.module.scss";
import doneImg from "../../images/done.png";
import { Preloader } from "../preloader/preloader";
import { useSelector } from "../../services/hooks";

type TOrderDetailsProps = {
  orderNumber: number | null;
};

export const OrderDetails: FC<TOrderDetailsProps> = (orderNumber) => {
  const { numberRequest, numberFailed } = useSelector((store) => ({
    numberRequest: store.order.numberRequest,
    numberFailed: store.order.numberFailed,
  }));

  return (
    <div className="pt-30 pb-30">
      {numberFailed ? (
        <p className="text text_type_main-medium mb-15">
          Ошибка при загрузке данных.
        </p>
      ) : numberRequest ? (
        <Preloader />
      ) : (
        <>
          <p className="text text_type_main-medium mb-15">
            <span
              className={`${styles.order_number} text text_type_digits-large mb-8`}
            >
              {orderNumber.orderNumber}
            </span>
            идентификатор заказа
          </p>
          <img
            className="mb-15"
            src={doneImg}
            alt="Ваш заказ начали готовить"
          />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};
