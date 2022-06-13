import React from "react";
import styles from "./404.module.scss";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <>
      <div className={`${styles.page_container} pl-4 pr-4`}>
        <div className={styles.column}>
          <h1
            className={`${styles.title} text text_type_main-large pt-20 mt-0 mb-4`}
          >
            Страница не найдена
          </h1>
          <p className="text text_type_digits-large">404</p>
          <p className="text text_type_main-default text_color_inactive pt-20 mt-0 mb-4">
            <Link to={{ pathname: "/" }} className={styles.link}>
              На главную
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
