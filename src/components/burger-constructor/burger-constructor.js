import React, { useState, useContext, useReducer, useEffect } from "react";
import uuid from "react-uuid";
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
import { IngredientPropTypes } from "../../utils/prop-types.js";
import { ItemsContext } from "../../services/burger-context";
import { getOrder } from "../../utils/burger-api.js";

function BurgerConstructor({ cart }) {
  const items = useContext(ItemsContext);
  const [bun, setBun] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [error] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [initialState, setInitialState] = useState({
    items: [],
    total: 0,
  });

  useEffect(() => {
    initialState.items = setInitialState(cart);
    if (typeof initialState !== "undefined") {
      cart.forEach((el) => {
        items.find((item) => item._id === el).type === "bun" &&
          setBun(items.find((item) => item._id === el));
      });
    }
    totalStateDispatcher({ type: "set" });
  }, [initialState, cart, items]);

  const totalInitialState = { total: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "set":
        let total = totalInitialState.total;
        cart.forEach((el) => {
          total = total + items.find((item) => item._id === el).price;
        });
        return {
          total: total,
        };
      case "reset":
        return totalInitialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [totalState, totalStateDispatcher] = useReducer(
    reducer,
    totalInitialState,
    undefined
  );

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  const makeOrder = () => {
    openModal();
    getOrder(cart)
      .then(setCurrentOrder)
      .catch(() => console.error("Ошибка в получении номера заказа."));
  };

  return (
    <>
      <section className={`${styles.product_list} pl-4 pb-10`}>
        <ul className={`${styles.inner} ${styles.list}`}>
          <li className={styles.item} key={uuid()}>
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
          {cart.map(
            (id, index) =>
              items.find((item) => item._id === id)._id !== bun._id && (
                <li className={styles.item} key={uuid()}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={`${items.find((item) => item._id === id).name}`}
                    price={items.find((item) => item._id === id).price}
                    thumbnail={items.find((item) => item._id === id).image}
                  />
                </li>
              )
          )}
          <li className={styles.item} key={uuid()}>
            <ConstructorElement
              type={"bottom"}
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>
      </section>
      <PriceBlock total={totalState.total}>
        <Button type="primary" size="large" onClick={makeOrder}>
          Оформить заказ
        </Button>
      </PriceBlock>
      {displayModal && !error && (
        <Modal closeMe={closeModal}>
          <OrderDetails orderNumber={currentOrder} />
        </Modal>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BurgerConstructor;
