import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  OrdersPage,
  NotFoundPage,
} from "../../pages";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { loadData } from "../../utils/api";
import { Location } from "history";

const Main: FC = () => {
  const { isAuthenticated } = useSelector((store: any) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();

  const initUser = () => {
    if (isAuthenticated) {
      dispatch<any>(getUserDataRequest());
    }
  };

  useEffect(() => {
    initUser();
    dispatch<any>(loadData());
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation<{ isModal: Location }>();

  const isModal = location.state && location.state.isModal;
  const closeModal = () => history.goBack();

  return (
    <div className="app">
      <Header />
      <main>
        <Switch location={isModal || location}>
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
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:number" exact={true}>
            <div>orders</div>
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
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
      </main>
    </div>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};
