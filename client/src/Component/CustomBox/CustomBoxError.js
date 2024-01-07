import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalError,
  selectModalError,
  setModalLucky,
} from "../../Feactures/modalSlice";
import { Modal } from "antd";
import styles from "./CustomBox.module.css";

function CustomBoxError({ message, closeFun }) {
  const modalError = useSelector(selectModalError);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setModalError(false));
    dispatch(closeFun(true));
  };

  return (
    <Modal
      centered
      open={modalError}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      width={700}
      className="modalStyle"
    >
      <div className={styles.box_succ}>
        <img
          className={styles.logo_succ}
          src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
        />
        <p className={styles.error_text}>Error!</p>
      </div>
    </Modal>
  );
}

export default CustomBoxError;
