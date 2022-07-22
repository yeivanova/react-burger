import React, { FC, useContext, useEffect } from "react";
import { Link, useLocation, Switch, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.scss";
import { v4 as uuid } from "uuid";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import { ProtectedRoute } from "../../components/protected-route/protected-route";
import { OrderItem } from "../../components/order-item/order-item";
import { ProfileForm } from "../../components/profile-form/profile-form";
import { Preloader } from "../../components/preloader/preloader";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  WsProfileConnectionStart,
  WsProfileConnectionClosed,
} from "../../services/actions/ws-auth";
import { MobileContext } from "../../services/app-context";

export const ProfilePage: FC = () => {
  const { wsConnected, orders, isError } = useSelector((store) => ({
    wsConnected: store.wsAuth.wsConnected,
    orders: store.wsAuth.orders,
    isError: store.wsAuth.isError,
  }));

  const { isMobile } = useContext(MobileContext);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wsConnected) {
      dispatch(WsProfileConnectionStart());
    }
    return () => {
      if (wsConnected) {
        dispatch(WsProfileConnectionClosed());
      }
    };
  }, [dispatch, wsConnected]);

  const { url } = useRouteMatch();

  return (
    <div className={`${styles.page_container} pt-10 pl-4 pr-4`}>
      {!isMobile && (
        <aside
          className={`${styles.sidebar} mt-20 mr-15 text_type_main-medium`}
        >
          <ProfileMenu />
          <p
            className={`${styles.text} text text_type_main-default text_color_inactive mt-20 mb-10`}
          >
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        </aside>
      )}
      <div className={`${styles.column}`}>
        <Switch>
          <ProtectedRoute path={url} exact={true}>
            <ProfileForm />
          </ProtectedRoute>
          {isError ? (
            <div className="text text_type_main-large mt-10 mb-5">
              Ошибка при загрузке данных.
            </div>
          ) : !wsConnected ? (
            <Preloader />
          ) : (
            <>
              <ProtectedRoute path={`${url}/orders`} exact={true}>
                <section className="pb-2">
                  {isMobile && (
                    <h1 className="text text_type_main-large mb-6">
                      История заказов
                    </h1>
                  )}
                  <div id="wrapper" className={`${styles.column_inner}`}>
                    <ul>
                      {orders?.map((item) => (
                        <li
                          className={`${styles.order_item} p-6 mb-4`}
                          key={item._id}
                        >
                          <Link
                            className={styles.link}
                            to={{
                              pathname: `/profile/orders/${item._id}`,
                              state: { isModalAuthOrder: location },
                            }}
                          >
                            <OrderItem orderItem={item} key={uuid()} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </ProtectedRoute>
            </>
          )}
        </Switch>
      </div>
    </div>
  );
};
