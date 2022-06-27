import React, { useState, useMemo, FC } from "react";
import { v4 as uuid } from "uuid";
import styles from "./burger-constructor.module.scss";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { PriceBlock } from "../price-block/price-block";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addItem,
  setBun,
  sortItems,
  cartReset,
} from "../../services/actions/constructor";
import { numberReset } from "../../services/actions/order";
import { getOrder } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { TIngredient } from "../../services/types/data";

interface IDragItem {
  item: TIngredient;
}

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems, bunItem, orderNumber, isAuthenticated } = useSelector(
    (store: any) => ({
      cartItems: store.cartItems.cartItems,
      bunItem: store.cartItems.bunItem,
      orderNumber: store.order.number,
      isAuthenticated: store.user.isAuthenticated,
    })
  );

  const totalPrice = useMemo(() => {
    return (
      (bunItem !== null ? bunItem.price * 2 : 0) +
      cartItems.reduce((sum: number, val: TIngredient) => sum + val.price, 0)
    );
  }, [bunItem, cartItems]);

  const moveItem = (item: IDragItem): void => {
    item.item.type === "bun" ? dispatch(setBun(item)) : dispatch(addItem(item));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      moveItem(item as IDragItem);
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
    const orderContent = [
      ...cartItems.map((item: TIngredient) => item._id),
      bunItem._id,
    ];
    dispatch<any>(getOrder(orderContent));
    openModal();
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
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
          {cartItems.map((item: TIngredient, index: number) => (
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
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};
