import React, { useState, useContext, FC } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  MenuIcon,
  CloseIcon,
  ArrowUpIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import mobileLogo from "../../images/mobile-logo.svg";
import { ProfileMenu } from "../profile-menu/profile-menu";
import { MobileContext } from "../../services/app-context";

export const Header: FC = () => {
  const { isMobile } = useContext(MobileContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropDownExpanded, setIsDropDownExpanded] = useState(true);

  if (isMobile)
    return (
      <header className={`${styles.header}`}>
        <nav className={`${styles.navbar}`}>
          <a href="/" className={styles.mobile_logo_link}>
            <img className="" src={mobileLogo} alt="На главную" />
          </a>
          <button
            className={styles.hamburger}
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
              document.body.classList.add("no-scroll");
            }}
          >
            <MenuIcon type="primary" />
          </button>
          <div
            className={`${styles.navigation_menu} p-2 pt-4 ${
              isNavExpanded ? styles.expanded : ""
            }`}
          >
            <button
              className={styles.close_button}
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
                document.body.classList.remove("no-scroll");
              }}
            >
              <CloseIcon type="primary" />
            </button>
            <p className="text text_type_main-large mb-4">Меню</p>
            <ul
              className={`${styles.navigation_list} text text_type_main-small`}
            >
              <li className={styles.navbar_item}>
                <NavLink
                  to="/profile"
                  className={styles.mobile_link}
                  activeClassName={styles.button_state_current}
                  onClick={() => {
                    setIsNavExpanded(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  <ProfileIcon type="secondary" />
                  Личный кабинет
                </NavLink>
                <div
                  className={`${styles.arrow_toggler} ${
                    isDropDownExpanded ? "" : styles.arrow_toggler_up
                  }`}
                  onClick={() => setIsDropDownExpanded(!isDropDownExpanded)}
                >
                  <ArrowUpIcon type="primary" />
                </div>
                <div
                  className={`${styles.dropdown} ${
                    isDropDownExpanded ? styles.dopdown_expanded : ""
                  }`}
                  onClick={() => {
                    setIsNavExpanded(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  <ProfileMenu />
                </div>
              </li>
              <li className={styles.navbar_item}>
                <NavLink
                  to="/"
                  exact
                  className={styles.mobile_link}
                  activeClassName={styles.button_state_current}
                  onClick={() => {
                    setIsNavExpanded(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  <BurgerIcon type="secondary" />
                  Конструктор бургеров
                </NavLink>
              </li>
              <li className={styles.navbar_item}>
                <NavLink
                  to="/feed"
                  className={styles.mobile_link}
                  activeClassName={styles.button_state_current}
                  onClick={() => {
                    setIsNavExpanded(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  <ListIcon type="secondary" />
                  Лента заказов
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );

  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.navbar} p-4`}>
        <div className={styles.navigation_menu}>
          <ul className={`${styles.navigation_list}`}>
            <li className={`${styles.navbar_item} mr-2`}>
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
            <li className={styles.navbar_item}>
              <NavLink
                to="/feed"
                className={`${styles.link} text_type_main-default`}
                activeClassName={styles.button_state_current}
              >
                <ListIcon type="secondary" />
                Лента заказов
              </NavLink>
            </li>
          </ul>
          <Link to="/" className={styles.logo}>
            <Logo />
            <img
              className={`${styles.sm_logo}`}
              src={mobileLogo}
              alt="На главную"
            />
          </Link>
          <ul
            className={`${styles.navigation_list} ${styles.navigation_list_right}`}
          >
            <li className={styles.navbar_item}>
              <NavLink
                to="/profile"
                className={`${styles.link} text_type_main-default`}
                activeClassName={styles.button_state_current}
              >
                <ProfileIcon type="secondary" />
                Личный кабинет
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
