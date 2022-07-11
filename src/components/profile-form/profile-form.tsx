import React, {
  FC,
  useEffect,
  useRef,
  useState,
  FormEvent,
  FocusEvent,
} from "react";
import { Redirect, useLocation } from "react-router-dom";
import styles from "./profile-form.module.scss";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TLocationState } from "../../services/types/data";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { updateUserDataRequest } from "../../utils/api";

export const ProfileForm: FC = () => {
  const { user, isAuthenticated } = useSelector((store) => ({
    user: store.user.userData,
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();

  const { values, setValues, handleChange } = useFormAndValidation();
  const [fieldDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (value: string) => {
    setError(!validateEmail(value));
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value) {
      validateField((e.target as HTMLInputElement).value);
    }
    setDisabled(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUserDataRequest(
        values as { name: string; email: string; password: string }
      )
    );
    setShowButtons(false);
  };

  const onCancel = () => {
    setValues({ name: user.name!, email: user.email!, password: "" });
    setShowButtons(false);
  };

  useEffect(() => {
    setValues({ name: user.name!, email: user.email!, password: "" });
  }, [user]);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated) {
    return <Redirect to={location.state?.from || "/login"} />;
  }

  return (
    <form className={`form ${styles.form} mt-20`} onSubmit={onSubmit}>
      <Input
        placeholder="Имя"
        value={values["name"] ?? ""}
        name="name"
        icon="EditIcon"
        ref={inputNameRef}
        onIconClick={() => {
          setDisabled(false);
          setShowButtons(true);
          setTimeout(() => inputNameRef.current?.focus(), 0);
        }}
        onChange={handleChange}
        onBlur={onBlur}
        error={false}
        disabled={fieldDisabled}
      />

      <Input
        placeholder="Логин"
        value={values["email"] ?? ""}
        name="email"
        errorText={"Проверьте формат email-адреса"}
        icon="EditIcon"
        ref={inputEmailRef}
        onIconClick={() => {
          setDisabled(false);
          setShowButtons(true);
          setTimeout(() => inputEmailRef.current?.focus(), 0);
        }}
        onChange={handleChange}
        onBlur={onBlur}
        error={false}
        disabled={fieldDisabled}
      />

      <Input
        type="password"
        placeholder="Пароль"
        value={values["password"] ?? ""}
        name={"password"}
        icon="EditIcon"
        ref={inputPasswordRef}
        onIconClick={() => {
          setDisabled(false);
          setShowButtons(true);
          setTimeout(() => inputPasswordRef.current?.focus(), 0);
        }}
        onChange={handleChange}
        onBlur={onBlur}
        error={false}
        disabled={fieldDisabled}
      />

      {showButtons ? (
        <div className={`${styles.button_row} mt-5`}>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
          <Button
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={onCancel}
          >
            Отмена
          </Button>
        </div>
      ) : null}
    </form>
  );
};
