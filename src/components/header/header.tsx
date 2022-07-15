import React, { useState, useContext, useEffect, FC } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="2" rx="1" fill="#F2F2F3" />
              <rect x="3" y="11" width="18" height="2" rx="1" fill="#F2F2F3" />
              <rect x="3" y="16" width="18" height="2" rx="1" fill="#F2F2F3" />
            </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L12 10.5858L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L13.4142 12L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L12 13.4142L4.70711 20.7071C4.31658 21.0976 3.68342 21.0976 3.29289 20.7071C2.90237 20.3166 2.90237 19.6834 3.29289 19.2929L10.5858 12L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289Z"
                  fill="#F2F2F3"
                />
              </svg>
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
                  onClick={() => setIsNavExpanded(false)}
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M10.9541 15.6475C11.5164 16.1175 12.4836 16.1175 13.0459 15.6475L17.6243 11.8214C18.4585 11.1242 17.8129 10 16.5783 10H7.42166C6.1871 10 5.54152 11.1242 6.37574 11.8214L10.9541 15.6475Z"
                      fill="#F2F2F3"
                    />
                  </svg>
                </div>
                <div
                  className={`${styles.dropdown} ${
                    isDropDownExpanded ? styles.dopdown_expanded : ""
                  }`}
                  onClick={() => setIsNavExpanded(false)}
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
                  onClick={() => setIsNavExpanded(false)}
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
                  onClick={() => setIsNavExpanded(false)}
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
