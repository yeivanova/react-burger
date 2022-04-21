import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";
import PriceBlock from "../price-block/price-block.js";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ cart, total }) {
  return (
    <>
      <section className={`${styles.product_list} pl-4 pb-10`}>
        <ul className={`${styles.inner} ${styles.list}`}>
          {cart.map((item, index) => (
            <li className={`${styles.item}`} key={item._id}>
              {index !== 0 && index !== cart.length - 1 ? (
                <DragIcon type="primary" />
              ) : (
                ""
              )}
              <ConstructorElement
                type={
                  index === 0
                    ? "top"
                    : index === cart.length - 1
                    ? "bottom"
                    : ""
                }
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      </section>
      <PriceBlock total={total} />
    </>
  );
}

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
};

export default BurgerConstructor;
