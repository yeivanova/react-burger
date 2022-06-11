import React, { useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Header } from "../components/header/header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { registrationRequest } from "../services/actions/user";

export function RegisterPage() {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const register = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registrationRequest(form));
    },
    [dispatch, form]
  );

  if (isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className="app">
      <Header />
      <main>
        <div className="page_container pl-4 pr-4">
          <form className="form">
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
            <Input
              placeholder="Имя"
              value={form.name}
              name="name"
              onChange={onChange}
            />
            <Input
              placeholder="Email"
              value={form.email}
              name="email"
              onChange={onChange}
            />
            <PasswordInput
              placeholder="Пароль"
              value={form.password}
              name="password"
              onChange={onChange}
              errorText={"Пароль должен содержать не менее 6 символов"}
            />
            <Button type="primary" size="large" onClick={register}>
              Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
              Уже зарегистрированы?&nbsp;
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
