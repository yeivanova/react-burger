import React, { FC, FormEvent, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../utils/api";
import { TLocationState } from "../services/types/data";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export const LoginPage: FC = () => {
  const { isAuthenticated } = useSelector((store: any) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const { values, handleChange } = useFormAndValidation();

  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();

  const login = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch<any>(
        loginRequest(values as { email: string; password: string })
      );
    },
    [dispatch, values]
  );

  if (isAuthenticated) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className="page_container pl-4 pr-4">
      <form className="form" onSubmit={login}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <Input
          type={"email"}
          placeholder={"Email"}
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ""}
          name={"password"}
        />
        <Button type="primary" size="medium">
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
  );
};
