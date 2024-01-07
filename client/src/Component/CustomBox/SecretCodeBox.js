import React from "react";
import { Modal } from "antd";
import {
  selectModalSecretCode,
  setModalSecretCode,
} from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CustomBox.module.css";

function SecretCodeBox() {
  const dispatch = useDispatch();
  const modalSecretCode = useSelector(selectModalSecretCode);

  const handleSecret = () => {
    dispatch(setModalSecretCode(true));
  };
  return (
    <>
      <Modal
        centered
        open={modalSecretCode}
        onOk={handleSecret}
        onCancel={() => dispatch(setModalSecretCode(false))}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.secret_container}>
          <div className={styles.secret_box}>
            <label>Enter Secret Code</label>
            <input type="text" className="input" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SecretCodeBox;
