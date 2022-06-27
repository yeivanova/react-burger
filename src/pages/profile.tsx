import React, {
  FC,
  useEffect,
  useRef,
  useState,
  FormEvent,
  FocusEvent,
} from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import styles from "./profile.module.scss";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDataRequest } from "../utils/api";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { TLocationState } from "../services/types/data";

export const ProfilePage: FC = () => {
  const { user, isAuthenticated } = useSelector((store: any) => ({
    user: store.user.userData,
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();

  const { values, setValues, handleChange } = useFormAndValidation();
  const [fieldDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setValues({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

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
    dispatch<any>(
      updateUserDataRequest(
        values as { name: string; email: string; password: string }
      )
    );
    setShowButtons(false);
  };

  const onCancel = () => {
    setValues({ name: user.name, email: user.email, password: "" });
    setShowButtons(false);
  };

  if (!isAuthenticated) {
    return <Redirect to={location.state?.from || "/login"} />;
  }

  return (
    <div className={`${styles.page_container} pt-30 pl-4 pr-4`}>
      <ProfileMenu />
      <div className={styles.column}>
        <form className={`form ${styles.form}`} onSubmit={onSubmit}>
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
      </div>
    </div>
  );
};
