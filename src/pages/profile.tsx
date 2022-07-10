import React, { FC, useEffect } from "react";
import { Link, useLocation, Switch, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.scss";
import { v4 as uuid } from "uuid";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { ProtectedRoute } from "../components/protected-route/protected-route";
import { OrderItem } from "../components/order-item/order-item";
import { ProfileForm } from "../components/profile-form/profile-form";
import { Preloader } from "../components/preloader/preloader";
import { useSelector, useDispatch } from "../services/hooks";
import {
  WsProfileConnectionStart,
  WsProfileConnectionClosed,
} from "../services/actions/ws-auth";

export const ProfilePage: FC = () => {
  const { wsConnected, orders, error } = useSelector((store) => ({
    wsConnected: store.wsAuth.wsConnected,
    orders: store.wsAuth.orders,
    error: store.wsAuth.error,
  }));

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
      <ProfileMenu />
      <div className={`${styles.column}`}>
        <Switch>
          <ProtectedRoute path={url} exact={true}>
            <ProfileForm />
          </ProtectedRoute>
          {error ? (
            <div className="text text_type_main-large mt-10 mb-5">
              Ошибка при загрузке данных.
            </div>
          ) : !wsConnected ? (
            <Preloader />
          ) : (
            <>
              <ProtectedRoute path={`${url}/orders`} exact={true}>
                <section className="pb-2">
                  <div id="wrapper" className={`${styles.column_inner}`}>
                    <ul>
                      {orders.map((item) => (
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
                            <OrderItem item={item} key={uuid()} />
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
