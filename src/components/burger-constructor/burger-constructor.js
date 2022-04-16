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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <div className="ml-8 mr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
          </div>
          <ul className={`${styles.inner} ${styles.list}`}>
            <li className={`${styles.item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Соус традиционный галактический"
                price={30}
                thumbnail={"https://code.s3.yandex.net/react/code/sauce-03.png"}
              />
            </li>
            <li className={`${styles.item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Мясо бессмертных моллюсков Protostomia"
                price={1337}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
              />
            </li>
            <li className={`${styles.item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Плоды Фалленианского дерева"
                price={874}
                thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
              />
            </li>
            <li className={`${styles.item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Хрустящие минеральные кольца"
                price={300}
                thumbnail={
                  "https://code.s3.yandex.net/react/code/mineral_rings.png"
                }
              />
            </li>
            <li className={`${styles.item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Хрустящие минеральные кольца"
                price={300}
                thumbnail={
                  "https://code.s3.yandex.net/react/code/mineral_rings.png"
                }
              />
            </li>
            <li className={`${styles.item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Хрустящие минеральные кольца"
                price={300}
                thumbnail={
                  "https://code.s3.yandex.net/react/code/mineral_rings.png"
                }
              />
            </li>
          </ul>
          <div className="ml-8 mr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
          </div>
        </div>
      </section>
      <PriceBlock total={total} />
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
    isLocked: PropTypes.bool,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }),
};

export default BurgerConstructor;
