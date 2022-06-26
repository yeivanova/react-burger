import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price-block.module.scss";

type TPriceBlockProps = {
  total: number;
  children: JSX.Element | JSX.Element[];
};

export const PriceBlock: FC<TPriceBlockProps> = ({ total, children }) => {
  return (
    <section className={`${styles.price_block}`}>
      <div className={`${styles.price} text text_type_digits-medium mr-10`}>
        {total} <CurrencyIcon type="primary" />
      </div>
      {children}
    </section>
  );
};
