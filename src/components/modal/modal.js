import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.js";
import styles from "./modal.module.scss";

const modalRoot = document.getElementById("react-modals");

function Modal({ closeMe, children, title = "" }) {
  const closeModal = useCallback(
    (event) => {
      closeMe(event);
    },
    [closeMe]
  );

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal_window}`}>
        <button className={`${styles.modal_close}`} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {title !== "" && (
          <p
            className={`${styles.modal_header} text text_type_main-large pt-10 pl-10 pr-10`}
          >
            {title}
          </p>
        )}
        {children}
      </div>
      <ModalOverlay onClose={closeModal} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  closeMe: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default Modal;
