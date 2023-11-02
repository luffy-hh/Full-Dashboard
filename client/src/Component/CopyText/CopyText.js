import React from "react";
import {
  selectCopyId,
  selectModalCopyText,
  setModalCopyText,
} from "../../Feactures/apiSlice";

import { useSelector, useDispatch } from "react-redux";
import styles from "../CustomBox/CustomBox.module.css";
import { Modal } from "antd";

const CopyText = ({ password }) => {
  const modalCopyText = useSelector(selectModalCopyText);
  const userId = useSelector(selectCopyId);
  const dispatch = useDispatch();
  const handleCopy = () => {
    const copyContent = document.getElementById("textToCopy");
    const textToCopy = copyContent.innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard Successfully");
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });

    dispatch(setModalCopyText(false));
  };

  return (
    <Modal
      title={`Copy ID and Password`}
      open={modalCopyText}
      onOk={handleCopy}
      onCancel={() => dispatch(setModalCopyText(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={"Copy"}
      className="modalStyle"
    >
      <div id="textToCopy" className={styles.copy_text_box}>
        <p>
          <span className={styles.copy_left}>User ID</span>{" "}
          <span>{userId}</span>
        </p>
        <p>
          <span className={styles.copy_left}>Password</span>{" "}
          <span>{password}</span>
        </p>
      </div>
    </Modal>
  );
};

export default CopyText;
