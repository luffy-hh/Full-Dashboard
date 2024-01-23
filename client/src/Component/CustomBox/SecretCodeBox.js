import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalSecretCode,
  setModalSecretCode,
} from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CustomBox.module.css";

function SecretCodeBox({ fun, id, unit, accessToken }) {
  const dispatch = useDispatch();
  const modalSecretCode = useSelector(selectModalSecretCode);
  const [security, setSecurity] = useState("");
  console.log(unit, security);

  const handleSecret = () => {
    dispatch(
      fun({
        api: `transferTo/${id}`,
        postData: { amount: unit, securityCode: security },
        accessToken,
      })
    );
    dispatch(setModalSecretCode(false));
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
            <input
              type="text"
              className="input"
              value={security}
              onChange={(e) => setSecurity(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SecretCodeBox;
