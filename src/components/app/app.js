import React, { useEffect } from "react";
import { getCookie } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataRequest } from "../../services/actions/user";
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
import Modal from "../modal/modal.js";
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import { loadData } from "../../services/actions/ingredients";

function Main() {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();

  const initUser = () => {
    const refreshToken = getCookie("refreshToken");
    if (isAuthenticated) {
      dispatch(getUserDataRequest(refreshToken));
    }
  };

  useEffect(() => {
    initUser();
    dispatch(loadData());
  }, [dispatch]);

  const location = useLocation();
  const history = useHistory();

  let isModal = location.state && location.state.isModal;
  const closeModal = () => history.goBack();
  return (
    <>
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
        <ProtectedRoute path="/profile/*">
          <OrdersPage />
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
          <Modal
            isModal={isModal}
            closeMe={closeModal}
            title={"Детали ингредиента"}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
