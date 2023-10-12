import React from "react";
import { selectModalShow, setModalShow } from "../../Feactures/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import styles from "./CustomBox.module.css";

function CustomBox() {
  const modalShow = useSelector(selectModalShow);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        title="Transfer Unit History"
        centered
        open={modalShow}
        onOk={() => dispatch(setModalShow(false))}
        onCancel={() => dispatch(setModalShow(false))}
        cancelButtonProps={{ style: { display: "none" } }}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        <div className={styles.form_style}>
          <div className={styles.form}>
            <label>Description</label>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <label>Unit</label>
            <input type="number" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomBox;
