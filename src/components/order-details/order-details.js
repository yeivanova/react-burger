import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.scss";
import doneImg from "../../images/done.png";

function OrderDetails({ orderNumber }) {
  return (
    <div className="pt-30 pb-30">
      <p className="text text_type_main-medium mb-15">
        <span
          className={`${styles.order_number} text text_type_digits-large mb-8`}
        >
          {orderNumber}
        </span>
        идентификатор заказа
      </p>
      <img className="mb-15" src={doneImg} alt="Ваш заказ начали готовить" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails;
