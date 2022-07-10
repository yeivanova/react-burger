import React, { FC, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Preloader } from "../components/preloader/preloader";
import { OrderItemDetails } from "../components/order-item-details/order-item-details";
import { useParams } from "react-router-dom";
import { TLocationState } from "../services/types/data";
import { useSelector, useDispatch } from "../services/hooks";
import {
  WsOrderConnectionStart,
  WsOrderConnectionClosed,
} from "../services/actions/ws";

type TOrderPageProps = {
  isAuthOrders: boolean;
};

export const OrderPage: FC<TOrderPageProps> = ({ isAuthOrders }) => {
  const { wsConnected, orders, error } = useSelector((store) => ({
    wsConnected: store.ws.wsConnected,
    orders: store.ws.orders,
    error: store.ws.error,
  }));

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
  }, [dispatch]);

  const orderId = useParams<{ id: string }>().id;
  const order = orders.find((item: { _id: string }) => item._id === orderId);

  const location = useLocation<TLocationState>();

  if (wsConnected && orders.length > 0 && !order) {
    return <Redirect to={location.state?.from || "/404"} />;
  }

  return (
    <>
      {error ? (
        <div className="text text_type_main-large mt-10 mb-5">
          Ошибка при загрузке данных.
        </div>
      ) : !wsConnected ? (
        <Preloader />
      ) : (
        <div className="pt-10 pl-4 pr-4 pb-10">
          {order && <OrderItemDetails isAuthOrders={isAuthOrders} />}
        </div>
      )}
    </>
  );
};
