import React, { useState, useRef, useMemo } from "react";
import IngredientSection from "../ingredient-section/ingredient-section.js";
import IngredientItem from "../ingredient-item/ingredient-item.js";
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import Modal from "../modal/modal.js";
import styles from "./burger-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB } from "../../services/actions/ingredients.jsx";
import {
  SET_VIEWED_INGREDIENT,
  CLEAR_VIEWED_INGREDIENT,
} from "../../services/actions/viewed-ingredient.jsx";

function BurgerIngredients() {
  const { items, currentTab, viewedIngredient } = useSelector((store) => ({
    items: store.ingredients.items,
    currentTab: store.currentTab.currentTab,
    viewedIngredient: store.viewedIngredient.viewedIngredient,
  }));

  const dispatch = useDispatch();
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = (e) => {
    setDisplayModal(true);
    dispatch({
      type: SET_VIEWED_INGREDIENT,
      viewedIngredient: e.currentTarget.id,
    });
  };

  const closeModal = () => {
    setDisplayModal(false);
    dispatch({
      type: CLEAR_VIEWED_INGREDIENT,
      viewedIngredient: [],
    });
  };

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
    dispatch({
      type: CHANGE_TAB,
      currentTab: e,
    });

    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom >= document.getElementById("wrapper").offsetTop;
  }

  const scrollIngredients = () => {
    if (isInViewport(bunRef.current)) {
      dispatch({
        type: CHANGE_TAB,
        currentTab: "bun",
      });
    } else if (isInViewport(sauceRef.current)) {
      dispatch({
        type: CHANGE_TAB,
        currentTab: "sauce",
      });
    } else if (isInViewport(mainRef.current)) {
      dispatch({
        type: CHANGE_TAB,
        currentTab: "main",
      });
    }
  };

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav className={`${styles.tabs}`}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={executeScroll(bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={executeScroll(sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={executeScroll(mainRef)}
        >
          Начинки
        </Tab>
      </nav>

      <div
        id="wrapper"
        className={`${styles.column_inner} mt-10`}
        onScroll={scrollIngredients}
      >
        <div id="bun" className="tabcontent" ref={bunRef}>
          <IngredientSection sectionTitle="Булки">
            {buns.map((item, index) => (
              <IngredientItem
                item={item}
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
            item={items.find((item) => item._id === viewedIngredient)}
          />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredients;
