import React from "react";
import PropTypes from "prop-types";
import IngredientSection from "../ingredient-section/ingredient-section.js";
import styles from "./burger-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients({ cart, data }) {
  const [current, setCurrent] = React.useState("bun");
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs}`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`${styles.column_inner} mt-10`}>
        <div id="bun" className="tabcontent">
          <IngredientSection
            key="bun"
            sectionTitle="Булки"
            type="bun"
            cart={cart}
            data={data}
          />
        </div>
        <div id="sauce" className="tabcontent">
          <IngredientSection
            key="sauce"
            sectionTitle="Соусы"
            type="sauce"
            cart={cart}
            data={data}
          />
        </div>
        <div id="main" className="tabcontent">
          <IngredientSection
            key="main"
            sectionTitle="Начинки"
            type="main"
            cart={cart}
            data={data}
          />
        </div>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredients;
