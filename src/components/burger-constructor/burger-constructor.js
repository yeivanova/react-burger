import React, { useState, useReducer, useEffect } from "react";
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
  ADD_ITEM,
  SET_BUN,
  SET_TOTAL,
  SORT_ITEMS,
} from "../../services/actions/constructor";
import { getOrder, NUMBER_RESET } from "../../services/actions/order";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { items, cartItems, total, bunItem, number } = useSelector((store) => ({
    items: store.ingredients.items,
    cartItems: store.cartItems.cartItems,
    total: store.total.total,
    bunItem: store.cartItems.bunItem,
    number: store.order.number,
  }));

  const moveItem = (item) => {
    item.item.cartItemId = uuid();
    item.item.type === "bun"
      ? dispatch({
          type: SET_BUN,
          ...item,
        })
      : dispatch({
          type: ADD_ITEM,
          ...item,
        });
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

  useEffect(() => {
    dispatch({
      type: SET_TOTAL,
      cartItems: cartItems.map((item) => item.price),
      bunItem: bunItem.price,
    });
  }, [dispatch, cartItems, bunItem]);

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
    dispatch({
      type: NUMBER_RESET,
    });
  };

  const makeOrder = () => {
    openModal();
    let orderContent = [...cartItems.map((item) => item._id), bunItem._id];
    dispatch(getOrder(orderContent));
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const changedCartItems = cartItems.slice();
    changedCartItems.splice(dragIndex, 1);
    changedCartItems.splice(hoverIndex, 0, cartItems[dragIndex]);
    dispatch({
      type: SORT_ITEMS,
      cartItems: changedCartItems,
    });
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
          {bunItem.length !== 0 && (
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
              key={uuid()}
              moveCard={moveCard}
              index={index}
            />
          ))}
          {bunItem.length !== 0 && (
            <ConstructorItem
              item={bunItem}
              key={uuid()}
              type={"bottom"}
              isLocked={true}
            />
          )}
        </ul>
      </section>
      <PriceBlock total={total}>
        <Button type="primary" size="large" onClick={makeOrder}>
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
