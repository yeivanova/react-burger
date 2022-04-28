import React from "react";
import styles from "./preloader.module.scss";
import preloader from "../../images/preloader.svg";

function Preloader() {
  return (
    <div className={`${styles.preloader} mt-10 mb-5`}>
      <img
        className={styles.preloader_image}
        src={preloader}
        alt="Загрузка..."
      />
    </div>
  );
}

export default Preloader;
