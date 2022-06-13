import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.scss";

function ModalOverlay(props) {
  const handleClick = (event) => {
    props.onClose(event);
  };
  return <div className={`${styles.overlay}`} onClick={handleClick} />;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
