import React, { useState, useRef, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import IngredientSection from "../ingredient-section/ingredient-section.js";
import IngredientItem from "../ingredient-item/ingredient-item.js";
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import Modal from "../modal/modal.js";
import styles from "./burger-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropTypes } from "../../utils/prop-types.js";
import { ItemsContext } from "../../services/burger-context";

function BurgerIngredients({ cart }) {
  const items = useContext(ItemsContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [clickedIngredienId, setClickedIngredienId] = useState(0);

  const openModal = (e) => {
    setDisplayModal(true);
    setClickedIngredienId(e.currentTarget.id);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  const [current, setCurrent] = React.useState("bun");

  const buns = useMemo(
    () => items.filter((item) => item.type === "bun"),
    [items]
  );

  const sauces = useMemo(
    () => items.filter((item) => item.type === "sauce"),
    [items]
  );

  const mains = useMemo(
    () => items.filter((item) => item.type === "main"),
    [items]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const executeScroll = (ref) => (e) => {
    setCurrent(e);
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav className={`${styles.tabs}`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={executeScroll(bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={executeScroll(sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={executeScroll(mainRef)}
        >
          Начинки
        </Tab>
      </nav>

      <div className={`${styles.column_inner} mt-10`}>
        <div id="bun" className="tabcontent" ref={bunRef}>
          <IngredientSection sectionTitle="Булки">
            {buns.map((item, index) => (
              <IngredientItem
                item={item}
                cart={cart}
                key={item._id}
                customClickEvent={openModal}
              />
            ))}
          </IngredientSection>
        </div>
        <div id="sauce" className="tabcontent" ref={sauceRef}>
          <IngredientSection sectionTitle="Соусы">
            {sauces.map((item, index) => (
              <IngredientItem
                item={item}
                cart={cart}
                key={item._id}
                customClickEvent={openModal}
              />
            ))}
          </IngredientSection>
        </div>
        <div id="main" className="tabcontent" ref={mainRef}>
          <IngredientSection sectionTitle="Начинки">
            {mains.map((item, index) => (
              <IngredientItem
                item={item}
                cart={cart}
                key={item._id}
                customClickEvent={openModal}
              />
            ))}
          </IngredientSection>
        </div>
      </div>
      {displayModal && (
        <Modal closeMe={closeModal} title={"Детали ингредиента"}>
          <IngredientDetails
            item={items.find((item) => item._id === clickedIngredienId)}
          />
        </Modal>
      )}
    </>
  );
}

BurgerIngredients.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BurgerIngredients;
