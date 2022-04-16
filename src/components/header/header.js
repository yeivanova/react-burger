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
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className="wrapper">
        <button
          className={`${`${styles.button} ${styles.button_state_current} text_type_main-default`} ${
            styles.button_state_current
          } text_type_main-default`}
        >
          <BurgerIcon type="primary" />
          Конструктор
        </button>
        <button className={`${styles.button} text_type_main-default`}>
          <ListIcon type="primary" />
          Лента заказов
        </button>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <button className={`${styles.button} text_type_main-default`}>
          <ProfileIcon type="primary" />
          Личный кабинет
        </button>
      </div>
    </header>
  );
}

export default Header;
