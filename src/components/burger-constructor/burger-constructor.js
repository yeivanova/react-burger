import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";
import PriceBlock from "../price-block/price-block.js";
import OrderDetails from "../order-details/order-details.js";
import Modal from "../modal/modal.js";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ items, cart }) {
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  let total = 0;

  cart.forEach((el) => {
    total = total + items.find((item) => item._id === el).price;
  });

  return (
    <>
      <section className={`${styles.product_list} pl-4 pb-10`}>
        <ul className={`${styles.inner} ${styles.list}`}>
          {cart.map((id, index) => (
            <li className={`${styles.item}`} key={index}>
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
                isLocked={
                  index === 0 ? true : index === cart.length - 1 ? true : ""
                }
                text={`${items.find((item) => item._id === id).name}${
                  index === 0
                    ? " (верх)"
                    : index === cart.length - 1
                    ? " (верх)"
                    : ""
                }`}
                price={items.find((item) => item._id === id).price}
                thumbnail={items.find((item) => item._id === id).image}
              />
            </li>
          ))}
        </ul>
      </section>
      <PriceBlock total={total}>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </PriceBlock>
      <Modal isOpen={displayModal} closeMe={closeModal}>
        <OrderDetails />
      </Modal>
    </>
  );
}

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BurgerConstructor;
