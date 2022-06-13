import React from "react";
import styles from "./profile.module.scss";
import { ProfileMenu } from "../components/profile-menu/profile-menu";

export function OrdersPage() {
  return (
    <div className={`${styles.page_container} pt-30 pl-4 pr-4`}>
      <ProfileMenu />
      <div className={styles.column}>
        <h1 className="text text_type_main-medium mb-6">История заказов</h1>
        <p className="text text_type_main-default text_color_inactive">
          У вас пока нет заказов
        </p>
      </div>
    </div>
  );
}
