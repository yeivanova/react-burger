import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import styles from "./profile.module.scss";
import { Header } from "../components/header/header";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDataRequest } from "../services/actions/user";

export function ProfilePage() {
  const { user, isAuthenticated } = useSelector((store) => ({
    user: store.user.userData,
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();
  const location = useLocation();

  const [form, setFormValue] = useState({ name: "", email: "", password: "" });
  const [fieldDisabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setFormValue({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (value) => {
    setError(!validateEmail(value));
  };

  const onChange = (e) => {
    setFormValue({ ...form, [e.target.name]: e.target.value });
    setShowButtons(true);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = (e) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setDisabled(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDataRequest(form));
    setShowButtons(false);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setFormValue({ name: user.name, email: user.email, password: "" });
    setShowButtons(false);
  };

  if (!isAuthenticated) {
    return <Redirect to={location.state?.from || "/login"} />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <div className={`${styles.page_container} pt-30 pl-4 pr-4`}>
          <ProfileMenu />
          <div className={styles.column}>
            <form className={`form ${styles.form}`} onSubmit={onSubmit}>
              <Input
                placeholder="Имя"
                value={form["name"] ?? ""}
                name="name"
                icon="EditIcon"
                ref={inputNameRef}
                onIconClick={() => {
                  setDisabled(false);
                  setTimeout(() => inputNameRef.current?.focus(), 0);
                }}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={fieldDisabled}
              />

              <Input
                placeholder="Логин"
                value={form["email"] ?? ""}
                name="email"
                errorText={"Проверьте формат email-адреса"}
                icon="EditIcon"
                ref={inputEmailRef}
                onIconClick={() => {
                  setDisabled(false);
                  setTimeout(() => inputEmailRef.current?.focus(), 0);
                }}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={fieldDisabled}
              />

              <Input
                type="password"
                placeholder="Пароль"
                value={form["password"] ?? ""}
                name={"password"}
                icon="EditIcon"
                ref={inputPasswordRef}
                onIconClick={() => {
                  setDisabled(false);
                  setTimeout(() => inputPasswordRef.current?.focus(), 0);
                }}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={fieldDisabled}
              />

              {showButtons ? (
                <div className={`${styles.button_row} mt-5`}>
                  <Button type="primary" size="medium" htmlType="submit">
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
      </main>
    </div>
  );
}
