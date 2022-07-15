import React, { FC, useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { getUserDataRequest } from "../../utils/api";
import {
  BrowserRouter,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
  FeedPage,
  OrderPage,
} from "../../pages";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderItemDetails } from "../order-item-details/order-item-details";
import { loadData } from "../../utils/api";
import { Location } from "history";
import { MobileContext } from "../../services/app-context";

const Main: FC = () => {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();

  const initUser = () => {
    if (isAuthenticated) {
      dispatch(getUserDataRequest());
    }
  };

  useEffect(() => {
    initUser();
    dispatch(loadData());
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation<{
    isModal: Location;
    isModalOrder: Location;
    isModalAuthOrder: Location;
  }>();

  const isModal = location.state && location.state.isModal;
  const isModalOrder = location.state && location.state.isModalOrder;
  const isModalAuthOrder = location.state && location.state.isModalAuthOrder;
  const closeModal = () => history.goBack();

  const isMobile = useContext(MobileContext);
  //console.log(isMobile);

  return (
    <div className="app">
      <Header />
      <main>
        <Switch
          location={isModal || isModalOrder || isModalAuthOrder || location}
        >
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <OrderPage isAuthOrders={true} />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderPage isAuthOrders={false} />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
        {isModal && (
          <Route path="/ingredients/:id" exact={true}>
            <Modal closeMe={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
        {isModalOrder && (
          <Route path="/feed/:id" exact={true}>
            <Modal closeMe={closeModal}>
              <OrderItemDetails isAuthOrders={false} />
            </Modal>
          </Route>
        )}
        {isModalAuthOrder && (
          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <Modal closeMe={closeModal}>
              <OrderItemDetails isAuthOrders={true} />
            </Modal>
          </ProtectedRoute>
        )}
      </main>
    </div>
  );
};

export const App: FC = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [windowDimension, setWindowDimension] = useState<number | null>(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
    windowDimension && windowDimension <= 640
      ? setIsMobile(true)
      : setIsMobile(false);
  }, [windowDimension, isMobile]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <BrowserRouter>
      <MobileContext.Provider
        value={{ isMobile: isMobile, changeIsMobile: setIsMobile }}
      >
        <Main />
      </MobileContext.Provider>
    </BrowserRouter>
  );
};
