import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Header() {
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.navbar} p-4`}>
        <ul className={`${styles.navigation_list}`}>
          <li className="navbar_item mr-2">
            <NavLink
              to="/"
              exact
              className={`${styles.link} text_type_main-default`}
              activeClassName={styles.button_state_current}
            >
              <BurgerIcon type="secondary" />
              Конструктор
            </NavLink>
          </li>
          <li className="navbar_item">
            <NavLink
              to="/feed"
              className={`${styles.link} text_type_main-default`}
              activeClassName={styles.button_state_current}
            >
              <ListIcon type="primary" />
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <ul
          className={`${styles.navigation_list} ${styles.navigation_list_right}`}
        >
          <li className="navbar_item">
            <NavLink
              to="/profile"
              className={`${styles.link} text_type_main-default`}
              activeClassName={styles.button_state_current}
            >
              <ProfileIcon type="primary" />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
