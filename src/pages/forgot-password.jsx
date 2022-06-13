import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  passwordForgotRequest,
  IS_PASSWORD_REQUESTED,
} from "../services/actions/user";

export function ForgotPasswordPage() {
  const { isTokenRequested, isAuthenticated } = useSelector((store) => ({
    isTokenRequested: store.user.forgotPassword.isTokenRequested,
    isAuthenticated: store.user.isAuthenticated,
  }));

  const [form, setValue] = useState({ email: "" });

  const dispatch = useDispatch();
  const location = useLocation();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const forgot = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(passwordForgotRequest(form));
      dispatch({
        type: IS_PASSWORD_REQUESTED,
      });
    },
    [dispatch, form]
  );

  if (isTokenRequested) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  if (isAuthenticated) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className="page_container pl-4 pr-4">
      <form className="form" onSubmit={forgot}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <Input
          type={"email"}
          placeholder={"Email"}
          onChange={onChange}
          value={form.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
        />

        <Button type="primary" size="large">
          Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
          Вспомнили пароль?&nbsp;
          <Link to={{ pathname: "/login" }} className="link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
