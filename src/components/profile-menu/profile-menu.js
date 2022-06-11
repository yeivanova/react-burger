import React, { useCallback } from "react";
import { Redirect, NavLink } from "react-router-dom";
import styles from "./profile-menu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../services/actions/user";
import { getCookie } from "../../utils/utils";
import { UNAUTHENTICATE_USER } from "../../services/actions/user";

export function ProfileMenu() {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();

  const onLogoutClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logoutRequest(getCookie("refreshToken")));
      dispatch({
        type: UNAUTHENTICATE_USER,
      });
    },
    [dispatch]
  );

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  return (
    <aside className={`${styles.sidebar} mr-15`}>
      <ul>
        <li>
          <NavLink
            to="/profile"
            exact
            className={`${styles.link} text_type_main-medium`}
            activeClassName={styles.link_state_current}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{ pathname: "/profile/orders" }}
            className={`${styles.link} text_type_main-medium`}
            activeClassName={styles.link_state_current}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            className={`${styles.button} text_type_main-medium`}
            onClick={onLogoutClick}
          >
            Выход
          </button>
        </li>
      </ul>
      <p
        className={`${styles.text} text text_type_main-default text_color_inactive mt-20 mb-10`}
      >
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </aside>
  );
}
