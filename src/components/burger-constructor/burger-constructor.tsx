import React, { useContext, useState, useMemo, FC } from "react";
import { v4 as uuid } from "uuid";
import styles from "./burger-constructor.module.scss";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { PriceBlock } from "../price-block/price-block";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import {
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
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
import { MobileContext } from "../../services/app-context";

interface IDragItem {
  item: TIngredient;
}

export const BurgerConstructor: FC = () => {
  const { isMobile } = useContext(MobileContext);
  const [isConstructorExpanded, setIsConstructorExpanded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems, bunItem, orderNumber, isAuthenticated } = useSelector(
    (store) => ({
      cartItems: store.cartItems.cartItems,
      bunItem: store.cartItems.bunItem,
      orderNumber: store.order.number,
      isAuthenticated: store.user.isAuthenticated,
    })
  );

  const totalPrice = useMemo(() => {
    return (
      (bunItem !== null ? bunItem.price * 2 : 0) +
      cartItems.reduce((sum, val) => sum + val.price, 0)
    );
  }, [bunItem, cartItems]);

  const moveItem = (item: IDragItem): void => {
    item.item.type === "bun"
      ? dispatch(setBun(item.item))
      : dispatch(addItem(item.item));
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
    setIsConstructorExpanded(false);
  };

  const makeOrder = () => {
    setIsConstructorExpanded(false);
    if (!isAuthenticated) {
      history.replace({ pathname: `/login` });
      return;
    }
    if (bunItem !== null) {
      const orderContent = [...cartItems.map((item) => item._id), bunItem._id];

      dispatch(getOrder(orderContent));
      openModal();
    }
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const changedCartItems = cartItems.slice();
    changedCartItems.splice(dragIndex, 1);
    changedCartItems.splice(hoverIndex, 0, cartItems[dragIndex]);
    dispatch(sortItems(changedCartItems));
  };

  return (
    <>
      {isMobile && totalPrice !== 0 && (
        <div className={styles.see_order}>
          <PriceBlock total={totalPrice}>{}</PriceBlock>
          <Button
            onClick={() => {
              setIsConstructorExpanded(!isConstructorExpanded);
              document.body.classList.add("no-scroll");
            }}
          >
            Смотреть заказ
          </Button>
        </div>
      )}
      <div
        className={`${isMobile ? styles.constructor_window : ""} ${
          isConstructorExpanded ? styles.expanded : ""
        }`}
      >
        <section className={`${styles.product_list} pl-4 pb-10`}>
          {isMobile && (
            <>
              <button
                className={`${styles.modal_close}`}
                onClick={() => {
                  setIsConstructorExpanded(!isConstructorExpanded);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <CloseIcon type="primary" />
              </button>
              <p className={`${styles.modal_header} text text_type_main-large`}>
                Заказ
              </p>
            </>
          )}
          {!isMobile && bunItem === null && cartItems.length === 0 && (
            <p
              className={`${styles.tip_text} text text_type_main-default text_color_inactive`}
            >
              Перетащи игредиенты сюда
            </p>
          )}
          <ul
            id="constructor"
            className={`${styles.inner} ${styles.list} ${
              isHover ? styles.on_hover : ""
            }`}
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
        <div className={isMobile ? styles.see_order : ""}>
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
        </div>
      </div>
      {displayModal && !error && (
        <Modal closeMe={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};
