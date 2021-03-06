import React, {
  useContext,
  useRef,
  useMemo,
  FC,
  SetStateAction,
  MutableRefObject,
} from "react";
import { IngredientSection } from "../ingredient-section/ingredient-section";
import { IngredientItem } from "../ingredient-item/ingredient-item";
import styles from "./burger-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import { changeTab } from "../../services/actions/ingredients";
import { MobileContext } from "../../services/app-context";

type TCounter = {
  [_id: string]: number;
};

export const BurgerIngredients: FC = () => {
  const { items, currentTab, cartItems, bunItem } = useSelector((store) => ({
    items: store.ingredients.items,
    currentTab: store.currentTab.currentTab,
    cartItems: store.cartItems.cartItems,
    bunItem: store.cartItems.bunItem,
  }));

  const { isMobile } = useContext(MobileContext);
  const dispatch = useDispatch();

  const ingredientsCounter = useMemo(() => {
    const counter = {} as TCounter;
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

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const executeScroll = (
    ref: MutableRefObject<HTMLDivElement | null>,
    e: SetStateAction<string>
  ): void => {
    dispatch(changeTab(e));
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  function isInViewport(element: HTMLDivElement) {
    const rect = element.getBoundingClientRect();
    return rect.bottom >= document.getElementById("wrapper")!.offsetTop;
  }

  const scrollIngredients = () => {
    if (isInViewport(bunRef.current!)) {
      dispatch(changeTab("bun"));
    } else if (isInViewport(sauceRef.current!)) {
      dispatch(changeTab("sauce"));
    } else if (isInViewport(mainRef.current!)) {
      dispatch(changeTab("main"));
    }
  };

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">???????????????? ????????????</h1>
      <nav className={`${styles.tabs}`}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={(e) => executeScroll(bunRef, e)}
        >
          ??????????
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={(e) => executeScroll(sauceRef, e)}
        >
          ??????????
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={(e) => executeScroll(mainRef, e)}
        >
          ??????????????
        </Tab>
      </nav>
      <div
        id="wrapper"
        className={`${styles.column_inner} mt-10`}
        onScroll={scrollIngredients}
      >
        <div id="bun" className="tabcontent" ref={bunRef}>
          <IngredientSection sectionTitle="??????????">
            {buns.map((item) => (
              <IngredientItem
                item={item}
                key={item._id}
                count={ingredientsCounter[item._id]}
              />
            ))}
          </IngredientSection>
        </div>
        <div id="sauce" className="tabcontent" ref={sauceRef}>
          <IngredientSection sectionTitle="??????????">
            {sauces.map((item) => (
              <IngredientItem
                item={item}
                key={item._id}
                count={ingredientsCounter[item._id]}
              />
            ))}
          </IngredientSection>
        </div>
        <div id="main" className="tabcontent" ref={mainRef}>
          <IngredientSection sectionTitle="??????????????">
            {mains.map((item) => (
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
};
