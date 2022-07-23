import React, { useCallback, FC, FormEvent } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { isPasswordRequested } from "../../services/actions/user";
import { passwordForgotRequest } from "../../utils/api";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { TLocationState } from "../../services/types/data";

export const ForgotPasswordPage: FC = () => {
  const { isTokenRequested, isAuthenticated } = useSelector((store) => ({
    isTokenRequested: store.user.forgotPassword.isTokenRequested,
    isAuthenticated: store.user.isAuthenticated,
  }));

  const { values, handleChange } = useFormAndValidation();

  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();

  const forgot = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(passwordForgotRequest(values as { email: string }));
      dispatch(isPasswordRequested());
    },
    [dispatch, values]
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
          placeholder="Укажите e-mail"
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
        <p className="prompt_text text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
          Вспомнили пароль?&nbsp;
          <Link to={{ pathname: "/login" }} className="link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
