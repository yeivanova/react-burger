import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Header } from "../components/header/header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordRequest,
  IS_PASSWORD_RESETED,
} from "../services/actions/user";

export function ResetPasswordPage() {
  const { isTokenRequested, isAuthenticated, isPasswordReseted } = useSelector(
    (store) => ({
      isTokenRequested: store.user.forgotPassword.isTokenRequested,
      isPasswordReseted: store.user.resetPassword.isPasswordReseted,
      isAuthenticated: store.user.isAuthenticated,
    })
  );

  const [form, setValue] = useState({ password: "", token: "" });

  const dispatch = useDispatch();
  const location = useLocation();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const reset = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPasswordRequest(form));
      dispatch({
        type: IS_PASSWORD_RESETED,
      });
    },
    [dispatch, form]
  );

  if (isPasswordReseted) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  if (!isTokenRequested) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  if (isAuthenticated) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <div className="page_container pl-4 pr-4">
          <form className="form">
            <h1 className="text text_type_main-medium mb-6">
              Восстановление пароля
            </h1>
            <PasswordInput
              placeholder={"Введите новый пароль"}
              value={form.password}
              name="password"
              onChange={onChange}
            />
            <Input
              placeholder="Введите код из письма"
              value={form.token}
              name="token"
              onChange={onChange}
              error={false}
              errorText={"Ошибка"}
            />

            <Button type="primary" size="large" onClick={reset}>
              Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
              Вспомнили пароль?&nbsp;
              <Link to={{ pathname: "/login" }} className="link">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
