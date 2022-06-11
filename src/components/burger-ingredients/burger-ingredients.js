import React, { useRef, useMemo } from "react";
import IngredientSection from "../ingredient-section/ingredient-section.js";
import IngredientItem from "../ingredient-item/ingredient-item.js";
import styles from "./burger-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB } from "../../services/actions/ingredients.jsx";

function BurgerIngredients() {
  const { items, currentTab, cartItems, bunItem } = useSelector((store) => ({
    items: store.ingredients.items,
    currentTab: store.currentTab.currentTab,
    cartItems: store.cartItems.cartItems,
    bunItem: store.cartItems.bunItem,
  }));

  const dispatch = useDispatch();

  const ingredientsCounter = useMemo(() => {
    const counter = {};
    cartItems.forEach((el) => {
      if (!counter[el._id]) counter[el._id] = 0;
      counter[el._id]++;
    });
    if (bunItem) counter[bunItem._id] = 2;
    return counter;
  }, [cartItems, bunItem]);

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
                count={ingredientsCounter[item._id]}
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
                count={ingredientsCounter[item._id]}
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
                count={ingredientsCounter[item._id]}
              />
            ))}
          </IngredientSection>
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
