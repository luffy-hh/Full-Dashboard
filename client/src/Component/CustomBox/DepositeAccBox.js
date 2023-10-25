import React from "react";
import { Modal } from "antd";
import {
  selectModalAccDepo,
  setModalAccDepo,
} from "../../Feactures/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";

function DepositeAccBox({ bankNameArr }) {
  const modalDeposite = useSelector(selectModalAccDepo);
  const dispatch = useDispatch();
  return (
    <Modal
      title="Create Bank Account"
      open={modalDeposite}
      onOk={() => dispatch(setModalAccDepo(false))}
      onCancel={() => dispatch(setModalAccDepo(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={"Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Bank Account</label>
          <input type="text" />
        </div>
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Logo</label>
          <input type="file" />
        </div>
      </form>
    </Modal>
  );
}

export default DepositeAccBox;
