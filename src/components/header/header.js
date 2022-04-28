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
            <a
              href="constructor"
              className={`${`${styles.link} ${styles.link_state_current} text_type_main-default`} ${
                styles.button_state_current
              } text_type_main-default`}
            >
              <BurgerIcon type="secondary" />
              Конструктор
            </a>
          </li>
          <li className="navbar_item">
            <a href="feed" className={`${styles.link} text_type_main-default`}>
              <ListIcon type="primary" />
              Лента заказов
            </a>
          </li>
        </ul>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <ul
          className={`${styles.navigation_list} ${styles.navigation_list_right}`}
        >
          <li className="navbar_item">
            <a
              href="profile"
              className={`${styles.link} text_type_main-default`}
            >
              <ProfileIcon type="primary" />
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
