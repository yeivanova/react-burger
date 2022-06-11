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
import { loginRequest } from "../services/actions/user";

export function LoginPage() {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const [form, setValue] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const location = useLocation();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequest(form));
    },
    [dispatch, form]
  );

  if (isAuthenticated) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <div className="page_container pl-4 pr-4">
          <form className="form">
            <h1 className="text text_type_main-medium mb-6">Вход</h1>
            <Input
              type={"email"}
              placeholder={"Email"}
              onChange={onChange}
              value={form.email}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
            />
            <PasswordInput
              onChange={onChange}
              placeholder={"Пароль"}
              value={form.password}
              name={"password"}
            />
            <Button type="primary" size="large" onClick={login}>
              Войти
            </Button>
            <p className="text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
              Вы — новый пользователь?&nbsp;
              <Link to={{ pathname: "/register" }} className="link">
                Зарегистрироваться
              </Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?&nbsp;
              <Link to={{ pathname: "/forgot-password" }} className="link">
                Восстановить пароль
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
