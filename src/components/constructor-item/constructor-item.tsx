import React, { FC } from "react";
import styles from "./constructor-item.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { deleteItem } from "../../services/actions/constructor";
import { TIngredient } from "../../services/types/data";

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
    hover(drapItem, monitor) {
      const item = drapItem as IDragItem;
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

  return (
    <>
      <li
        className={`${styles.item} ${isLocked && styles.item_bun} ${
          isDragging && styles.drag_effect
        }`}
        ref={ref}
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
