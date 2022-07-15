import React, { FC, FormEvent, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import { registrationRequest } from "../../utils/api";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export const RegisterPage: FC = () => {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const { values, handleChange } = useFormAndValidation();
  const dispatch = useDispatch();

  const register = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        registrationRequest(
          values as { name: string; email: string; password: string }
        )
      );
    },
    [dispatch, values]
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
    <div className="page_container pl-4 pr-4">
      <form className="form" onSubmit={register}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input
          placeholder="Имя"
          value={values.name || ""}
          name="name"
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          value={values.email || ""}
          name="email"
          onChange={handleChange}
        />
        <PasswordInput
          value={values.password || ""}
          name="password"
          onChange={handleChange}
        />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p className="prompt_text text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
          Уже зарегистрированы?&nbsp;
          <Link to={{ pathname: "/login" }} className="link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
