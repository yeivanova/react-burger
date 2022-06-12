import React, { useState, useMemo } from "react";
import uuid from "react-uuid";
import styles from "./burger-constructor.module.scss";
import ConstructorItem from "../constructor-item/constructor-item.js";
import PriceBlock from "../price-block/price-block.js";
import OrderDetails from "../order-details/order-details.js";
import Modal from "../modal/modal.js";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addItem,
  setBun,
  sortItems,
  cartReset,
} from "../../services/actions/constructor";
import { getOrder, numberReset } from "../../services/actions/order";
import { useHistory, useLocation } from "react-router-dom";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems, bunItem, number, isAuthenticated } = useSelector(
    (store) => ({
      cartItems: store.cartItems.cartItems,
      bunItem: store.cartItems.bunItem,
      number: store.order.number,
      isAuthenticated: store.user.isAuthenticated,
    })
  );

  const totalPrice = useMemo(() => {
    return (
      (bunItem !== null ? bunItem.price * 2 : 0) +
      cartItems.reduce((sum, val) => sum + val.price, 0)
    );
  }, [bunItem, cartItems]);

  const moveItem = (item) => {
    item.item.type === "bun" ? dispatch(setBun(item)) : dispatch(addItem(item));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      moveItem(itemId);
    },
  });

  const [displayModal, setDisplayModal] = useState(false);
  const [error] = useState();

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
    dispatch(numberReset());
    dispatch(cartReset());
  };

  const makeOrder = () => {
    if (!isAuthenticated) {
      history.replace({ pathname: `/login` });
      return;
    }
    const orderContent = [...cartItems.map((item) => item._id), bunItem._id];
    dispatch(getOrder(orderContent));
    openModal();
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const changedCartItems = cartItems.slice();
    changedCartItems.splice(dragIndex, 1);
    changedCartItems.splice(hoverIndex, 0, cartItems[dragIndex]);
    dispatch(sortItems(changedCartItems));
  };

  return (
    <>
      <section className={`${styles.product_list} pl-4 pb-10`}>
        <ul
          className={`${styles.inner} ${styles.list} ${
            isHover ? styles.on_hover : ""
          } `}
          ref={dropTarget}
        >
          {bunItem !== null && (
            <ConstructorItem
              item={bunItem}
              key={uuid()}
              type={"top"}
              isLocked={true}
            />
          )}
          {cartItems.map((item, index) => (
            <ConstructorItem
              item={item}
              isLocked={false}
              key={item.uuid}
              moveCard={moveCard}
              index={index}
            />
          ))}
          {bunItem !== null && (
            <ConstructorItem
              item={bunItem}
              key={uuid()}
              type={"bottom"}
              isLocked={true}
            />
          )}
        </ul>
      </section>
      <PriceBlock total={totalPrice}>
        <Button
          type="primary"
          size="large"
          disabled={bunItem === null && true}
          onClick={makeOrder}
        >
          Оформить заказ
        </Button>
      </PriceBlock>
      {displayModal && !error && (
        <Modal closeMe={closeModal}>
          <OrderDetails orderNumber={number} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
