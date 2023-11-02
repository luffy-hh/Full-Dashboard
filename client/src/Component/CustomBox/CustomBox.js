import React from "react";
import { selectModalShow, setModalShow } from "../../Feactures/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { selectUserId, selectCondition } from "../../Feactures/modalSlice";
import {
  selectPostTransferStatus,
  postTransferUnit,
  selectlogInData,
} from "../../Feactures/apiSlice";

import styles from "./CustomBox.module.css";

function CustomBox({ title, amount, setAmount, descr, setDescr }) {
  const modalShow = useSelector(selectModalShow);
  const toId = useSelector(selectUserId);
  const logInData = useSelector(selectlogInData);
  const dispatch = useDispatch();
  const postTransferStatus = useSelector(selectPostTransferStatus);
  const accessToken = logInData.token;
  const condition = useSelector(selectCondition);

  const postDataDep = {
    transferUnit: Number(amount),
    status: "out",
    toId,
    description: descr,
  };

  const postDataWith = {
    transferUnit: Number(amount),
    status: "in",
    toId,
    description: descr,
  };

  const clickHandle = () => {
    if (condition === "DEP") {
      dispatch(
        postTransferUnit({
          api: "mainunitstransfer",
          postData: postDataDep,
          accessToken,
        })
      );

      if (postTransferStatus) {
        dispatch(setModalShow(false));
        dispatch(setAmount(""));
        dispatch(setDescr(""));
      }
    } else {
      dispatch(
        postTransferUnit({
          api: "mainunitstransfer",
          postData: postDataWith,
          accessToken,
        })
      );
      if (postTransferStatus) {
        dispatch(setModalShow(false));
        dispatch(setAmount(""));
        dispatch(setDescr(""));
      }
    }
  };
  return (
    <>
      <Modal
        title={title}
        centered
        open={modalShow}
        onOk={clickHandle}
        onCancel={() => dispatch(setModalShow(false))}
        cancelButtonProps={{ style: { display: "none" } }}
        width={700}
        okText={postTransferStatus === "loading" ? "Saving" : "Save"}
        className="modalStyle"
      >
        <div className={styles.form_style}>
          <div className={styles.form}>
            <label>Description</label>
            <input
              type="text"
              value={descr}
              onChange={(e) => dispatch(setDescr(e.target.value))}
            />
          </div>
          <div className={styles.form}>
            <label>Unit</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => dispatch(setAmount(e.target.value))}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomBox;
