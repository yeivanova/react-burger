import React, { FC, useCallback, MouseEvent } from "react";
import { Redirect, NavLink } from "react-router-dom";
import styles from "./profile-menu.module.scss";
import { useSelector, useDispatch } from "../../services/hooks";
import { logoutRequest } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { unautheticateUser } from "../../services/actions/user";

export const ProfileMenu: FC = () => {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  const dispatch = useDispatch();

  const onLogoutClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(logoutRequest(getCookie("refreshToken")));
      dispatch(unautheticateUser());
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
    <ul>
      <li>
        <NavLink
          to="/profile"
          exact
          className={styles.link}
          activeClassName={styles.link_state_current}
        >
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{ pathname: "/profile/orders" }}
          className={styles.link}
          activeClassName={styles.link_state_current}
        >
          История заказов
        </NavLink>
      </li>
      <li>
        <button className={styles.button} onClick={onLogoutClick}>
          Выход
        </button>
      </li>
    </ul>
  );
};
