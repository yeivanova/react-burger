import React, { FC, FormEvent, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks";
import { isPasswordReseted } from "../services/actions/user";
import { resetPasswordRequest } from "../utils/api";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { TLocationState } from "../services/types/data";

export const ResetPasswordPage: FC = () => {
  const { isTokenRequested, isAuthenticated, isPasswordResetedFlag } = useSelector(
    (store) => ({
      isTokenRequested: store.user.forgotPassword.isTokenRequested,
      isPasswordResetedFlag: store.user.resetPassword.isPasswordReseted,
      isAuthenticated: store.user.isAuthenticated,
    })
  );

  const { values, handleChange } = useFormAndValidation();

  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();

  const reset = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        resetPasswordRequest(values as { password: string; token: string })
      );
      dispatch(isPasswordReseted());
    },
    [dispatch, values]
  );

  if (isPasswordResetedFlag) {
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
    <div className="page_container pl-4 pr-4">
      <form className="form" onSubmit={reset}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <PasswordInput
          value={values.password || ""}
          name="password"
          onChange={handleChange}
        />
        <Input
          placeholder="Введите код из письма"
          value={values.token || ""}
          name="token"
          onChange={handleChange}
          error={false}
          errorText={"Ошибка"}
        />
        <Button type="primary" size="medium">
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
  );
};
