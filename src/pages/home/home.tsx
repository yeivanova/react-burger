import React, { FC, useContext } from "react";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { Preloader } from "../../components/preloader/preloader";
import styles from "./home.module.scss";
import { useSelector } from "../../services/hooks";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MobileContext } from "../../services/app-context";

export const HomePage: FC = () => {
  const { itemsRequest, itemsFailed } = useSelector((store) => ({
    itemsRequest: store.ingredients.itemsRequest,
    itemsFailed: store.ingredients.itemsFailed,
  }));

  const { isMobile } = useContext(MobileContext);

  return (
    <>
      <div className={`${styles.page_container} pl-4 pr-4`}>
        {itemsFailed ? (
          <div className="text text_type_main-large mt-10 mb-5">
            Ошибка при загрузке данных.
          </div>
        ) : itemsRequest ? (
          <Preloader />
        ) : (
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <div className={`${styles.column} pb-10`}>
              <BurgerIngredients />
            </div>
            <div className={`${styles.column} pb-10`}>
              <BurgerConstructor />
            </div>
          </DndProvider>
        )}
      </div>
    </>
  );
};
