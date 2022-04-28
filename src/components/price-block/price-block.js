import React from "react";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-block.module.scss";

function PriceBlock({ total, children }) {
  return (
    <section className={`${styles.price_block}`}>
      <div className={`${styles.price} text text_type_digits-medium mr-10`}>
        {total} <CurrencyIcon type="primary" />
      </div>
      {children}
    </section>
  );
}

PriceBlock.propTypes = {
  total: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};

export default PriceBlock;
