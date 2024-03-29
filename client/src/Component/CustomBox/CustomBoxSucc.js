import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalSucc,
  selectModalSucc,
  selectBeforeAmt,
} from "../../Feactures/modalSlice";
import { Modal } from "antd";
import styles from "./CustomBox.module.css";

function CustomBoxSucc({ clearFun }) {
  const modalSucc = useSelector(selectModalSucc);
  const dispatch = useDispatch();
  const beforeAmt = useSelector(selectBeforeAmt);

  const handleCancel = () => {
    dispatch(clearFun());
    dispatch(setModalSucc(false));
  };

  return (
    <Modal
      centered
      open={modalSucc}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      width={700}
      className="modalStyle"
    >
      <div className={styles.box_succ}>
        <img
          className={styles.logo_succ}
          src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/172-512.png"
        />
        <p className={styles.succ_text}>Succeded!</p>
      </div>
    </Modal>
  );
}

export default CustomBoxSucc;
