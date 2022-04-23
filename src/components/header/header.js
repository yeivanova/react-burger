import React from "react";
import styles from "./header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Header() {
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.navbar} p-4`}>
        <ul className={`${styles.navigation_list}`}>
          <li className="navbar_item mr-2">
            <button
              className={`${`${styles.button} ${styles.button_state_current} text_type_main-default`} ${
                styles.button_state_current
              } text_type_main-default`}
            >
              <BurgerIcon type="secondary" />
              Конструктор
            </button>
          </li>
          <li className="navbar_item">
            <button className={`${styles.button} text_type_main-default`}>
              <ListIcon type="primary" />
              Лента заказов
            </button>
          </li>
        </ul>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <ul
          className={`${styles.navigation_list} ${styles.navigation_list_right}`}
        >
          <li className="navbar_item">
            <button className={`${styles.button} text_type_main-default`}>
              <ProfileIcon type="primary" />
              Личный кабинет
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
