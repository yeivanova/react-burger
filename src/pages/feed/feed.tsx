import React, {
  FC,
  useContext,
  useEffect,
  useState,
  useRef,
  SetStateAction,
  MutableRefObject,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Preloader } from "../../components/preloader/preloader";
import { OrderItem } from "../../components/order-item/order-item";
import { OrdersInfo } from "../../components/orders-info/orders-info";
import styles from "./feed.module.scss";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  WsOrderConnectionStart,
  WsOrderConnectionClosed,
} from "../../services/actions/ws";
import { v4 as uuid } from "uuid";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { MobileContext } from "../../services/app-context";

export const FeedPage: FC = () => {
  const { wsConnected, orders, error, total, totalToday } = useSelector(
    (store) => ({
      wsConnected: store.ws.wsConnected,
      orders: store.ws.orders,
      error: store.ws.error,
      total: store.ws.total,
      totalToday: store.ws.totalToday,
    })
  );

  const { isMobile } = useContext(MobileContext);
  const [currentTab, setCurrentTab] = useState("orders");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wsConnected) {
      dispatch(WsOrderConnectionStart());
    }
    return () => {
      if (wsConnected) {
        dispatch(WsOrderConnectionClosed());
      }
    };
  }, [dispatch, wsConnected]);

  const tabBlocks = Array.from(
    document.getElementsByClassName(
      "tabcontent"
    ) as HTMLCollectionOf<HTMLElement>
  );

  useEffect(() => {
    tabBlocks.forEach((tabBlock) => {
      isMobile
        ? tabBlock.classList.remove("visible")
        : tabBlock.classList.add("visible");
    });
  }, []);

  const ordersRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const changeTab = (
    ref: MutableRefObject<HTMLDivElement | null>,
    e: SetStateAction<string>
  ): void => {
    tabBlocks.forEach((tabBlock) => {
      tabBlock.classList.remove("visible");
    });
    if (ref && ref.current) {
      ref.current.classList.add("visible");
    }

    setCurrentTab(currentTab === "info" ? "orders" : "info");
  };

  return (
    <>
      <div className={`${styles.page_container} pt-10 pl-4 pr-4`}>
        {error ? (
          <div className="text text_type_main-large mt-10 mb-5">
            Ошибка при загрузке данных.
          </div>
        ) : !wsConnected ? (
          <Preloader />
        ) : (
          <>
            <h1 className={`${styles.title} text text_type_main-large mb-5`}>
              Лента заказов
            </h1>
            {isMobile && (
              <>
                <nav className={`${styles.tabs} mb-5`}>
                  <Tab
                    value="orders"
                    active={currentTab === "orders"}
                    onClick={(e) => changeTab(ordersRef, e)}
                  >
                    Заказы
                  </Tab>
                  <Tab
                    value="info"
                    active={currentTab === "info"}
                    onClick={(e) => changeTab(infoRef, e)}
                  >
                    Статистика
                  </Tab>
                </nav>
              </>
            )}
            <div
              id="orders"
              className={`${styles.column} pb-10 ${styles.tabcontent} ${
                currentTab === "orders" ? styles.visible : ""
              }`}
              ref={ordersRef}
            >
              <section className="pb-2">
                <div className={`${styles.column_inner}`}>
                  <ul className={`${styles.orders_list}`}>
                    {orders.map((item) => (
                      <li
                        className={`${styles.order_item} p-6 mb-4`}
                        key={item._id}
                      >
                        <Link
                          className={styles.link}
                          to={{
                            pathname: `/feed/${item._id}`,
                            state: { isModalOrder: location },
                          }}
                        >
                          <OrderItem orderItem={item} key={uuid()} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
            <div
              id="info"
              className={`${styles.column} pl-5 pb-10 ${styles.tabcontent} ${
                currentTab === "info" ? styles.visible : ""
              }`}
              ref={infoRef}
            >
              <OrdersInfo
                orders={orders}
                total={total}
                totalToday={totalToday}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
