import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-block.module.scss";

function PriceBlock({ total }) {
  return (
    <section className={`${styles.price_block}`}>
      <div className={`${styles.price} text text_type_digits-medium mr-10`}>
        {total} <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </section>
  );
}

PriceBlock.propTypes = {
  total: PropTypes.number.isRequired,
};

export default PriceBlock;
