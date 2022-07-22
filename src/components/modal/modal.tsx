import React, {
  FC,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";
import { MobileContext } from "../../services/app-context";

const modalRoot = document.getElementById("react-modals") as
  | Element
  | DocumentFragment;

type TModalProps = {
  closeMe: () => void;
  children: ReactNode;
  title?: string;
};

export const Modal: FC<TModalProps> = ({ closeMe, children, title = "" }) => {
  const { isMobile } = useContext(MobileContext);

  const closeModal = useCallback(() => {
    closeMe();
    document.body.classList.remove("no-scroll");
  }, [closeMe]);

  useEffect(() => {
    document.body.classList.add("no-scroll");
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
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
        <button
          className={`${styles.modal_close} modal_close`}
          onClick={closeModal}
        >
          <CloseIcon type="primary" />
        </button>
        {!isMobile && title !== "" && (
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
};
