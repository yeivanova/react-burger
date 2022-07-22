import React, { FC, useContext } from "react";
import styles from "./constructor-item.module.scss";
import {
  ConstructorElement,
  DragIcon,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PriceBlock } from "../price-block/price-block";
import { useDispatch } from "../../services/hooks";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { deleteItem } from "../../services/actions/constructor";
import { TIngredient } from "../../services/types/data";
import { MobileContext } from "../../services/app-context";
import SwipeToDelete from "react-swipe-to-delete-ios";
import { v4 as uuid } from "uuid";

type TConstructorItemProps = {
  item: TIngredient;
  type?: "top" | "bottom" | undefined;
  isLocked: boolean | undefined;
  index?: number;
  moveCard?: (param1: number, param2: number) => void;
};

interface IDragItem {
  index: number;
}

export const ConstructorItem: FC<TConstructorItemProps> = ({
  item,
  type,
  isLocked,
  index,
  moveCard,
}) => {
  const { isMobile } = useContext(MobileContext);
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const deleteIt = (item: TIngredient) => {
    dispatch(deleteItem(item));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "cartItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(dropItem, monitor) {
      const item = dropItem as IDragItem;
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex: number = index!;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard!(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "cartItem",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  if (isMobile)
    return (
      <>
        <li
          className={styles.list_item}
          ref={!isLocked ? ref : null}
          data-handler-id={handlerId}
        >
          {!isLocked ? (
            <SwipeToDelete
              onDelete={() => {
                dispatch(deleteItem(item));
              }}
              deleteWidth={144}
              deleteColor="#E52B1A"
              deleteComponent={<DeleteIcon type="primary" />}
              id={uuid()}
            >
              <div className={styles.mobile_item}>
                <DragIcon type="primary" />
                <div className={styles.mobile_item_inner}>
                  <img
                    className={styles.mobile_item_img}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                  <span
                    className={`${styles.mobile_item_name} text text_type_main-default`}
                  >
                    {item.name}
                  </span>
                  <div className={styles.mobile_item_price}>
                    <PriceBlock total={item.price}>{}</PriceBlock>
                  </div>
                </div>
              </div>
            </SwipeToDelete>
          ) : (
            <div className={styles.mobile_item_inner}>
              <img
                className={styles.mobile_item_img}
                src={item.image_mobile}
                alt={item.name}
              />
              <span
                className={`${styles.mobile_item_name} text text_type_main-default`}
              >
                {item.name}
              </span>
              <div className={styles.mobile_item_price}>
                <PriceBlock total={item.price}>{}</PriceBlock>
              </div>
            </div>
          )}
        </li>
      </>
    );

  return (
    <>
      <li
        className={`${styles.item} ${isLocked ? styles.item_bun : ""} ${
          isDragging ? styles.drag_effect : ""
        }`}
        ref={!isLocked ? ref : null}
        data-handler-id={handlerId}
      >
        {!isLocked && <DragIcon type="primary" />}
        <ConstructorElement
          text={`${item.name} ${
            type === "top" ? " (верх)" : type === "bottom" ? " (низ)" : ""
          }`}
          price={item.price}
          thumbnail={item.image}
          type={type}
          isLocked={isLocked}
          handleClose={() => deleteIt(item)}
        />
      </li>
    </>
  );
};
