import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-item.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropTypes } from "../../utils/prop-types.js";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DELETE_ITEM } from "../../services/actions/constructor";

function ConstructorItem({
  item,
  type = "undefined",
  isLocked = "default",
  index,
  moveCard,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const deleteItem = (e, item) => {
    dispatch({
      type: DELETE_ITEM,
      item,
    });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "cartItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
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
          handleClose={(e) => deleteItem(e, item)}
        />
      </li>
    </>
  );
}

ConstructorItem.propTypes = {
  item: IngredientPropTypes.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

export default ConstructorItem;
