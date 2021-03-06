import React, { FC, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Preloader } from "../../components/preloader/preloader";
import { OrderItemDetails } from "../../components/order-item-details/order-item-details";
import { useParams } from "react-router-dom";
import { TLocationState } from "../../services/types/data";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  WsOrderConnectionStart,
  WsOrderConnectionClosed,
} from "../../services/actions/ws";
import {
  WsProfileConnectionStart,
  WsProfileConnectionClosed,
} from "../../services/actions/ws-auth";

type TOrderPageProps = {
  isAuthOrders: boolean;
};

export const OrderPage: FC<TOrderPageProps> = ({ isAuthOrders }) => {
  const { wsConnected, orders, isError } = useSelector((store) => ({
    wsConnected: isAuthOrders ? store.wsAuth.wsConnected : store.ws.wsConnected,
    orders: isAuthOrders ? store.wsAuth.orders : store.ws.orders,
    isError: isAuthOrders ? store.wsAuth.isError : store.ws.isError,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthOrders) {
      if (!wsConnected) {
        dispatch(WsProfileConnectionStart());
      }

      return () => {
        if (wsConnected) {
          dispatch(WsProfileConnectionClosed());
        }
      };
    } else {
      if (!wsConnected) {
        dispatch(WsOrderConnectionStart());
      }

      return () => {
        if (wsConnected) {
          dispatch(WsOrderConnectionClosed());
        }
      };
    }
  }, [dispatch, wsConnected, isAuthOrders]);

  const orderId = useParams<{ id: string }>().id;
  const order = orders.find((item: { _id: string }) => item._id === orderId);

  const location = useLocation<TLocationState>();

  if (wsConnected && orders.length > 0 && !order) {
    return <Redirect to={location.state?.from || "/404"} />;
  }

  return (
    <>
      {isError ? (
        <div className="text text_type_main-large mt-10 mb-5">
          Ошибка при загрузке данных.
        </div>
      ) : !wsConnected ? (
        <Preloader />
      ) : (
        <>
          {order && <OrderItemDetails isAuthOrders={isAuthOrders} />}
        </>
      )}
    </>
  );
};
