import React, { FC } from "react";
import styles from "./modal-overlay.module.scss";

type TModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {
  return <div id="overlay" className={`${styles.overlay}`} onClick={onClose} />;
};
