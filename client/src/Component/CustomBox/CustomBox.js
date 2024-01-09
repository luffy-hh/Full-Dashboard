import React, { useState } from "react";
import {
  selectModalShow,
  setModalShow,
  setCurrentUnit,
} from "../../Feactures/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { selectUserId, selectCondition } from "../../Feactures/modalSlice";
import {
  selectPostTransferStatus,
  postTransferUnit,
  selectlogInData,
  selectPostTransferToUserStatus,
  postTransferToUser,
  selectPostTransfer,
} from "../../Feactures/apiSlice";

import styles from "./CustomBox.module.css";
import Error from "../ErrorandSuccess/Error";
import ErrorandSucc from "./ErrorandSucc";

function CustomBox({ title, amount, setAmount, descr, setDescr }) {
  const modalShow = useSelector(selectModalShow);
  const toId = useSelector(selectUserId);
  const logInData = useSelector(selectlogInData);
  const dispatch = useDispatch();
  const postTransferStatus = useSelector(selectPostTransferStatus);
  const [error, setError] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const postTransfer = useSelector(selectPostTransfer);

  const postTransferToUserStatus = useSelector(selectPostTransferToUserStatus);
  const accessToken = logInData.token;
  const currentUser = logInData.user.role;
  console.log(currentUser);
  const condition = useSelector(selectCondition);

  console.log(condition);

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

  const postDataAgentDep = {
    toId,
    amount: Number(amount),
    desc: descr,
  };

  const postDataAgentWith = {
    toId,
    amount: Number(amount),
    desc: descr,
  };

  const addUnitFun = (api, postFun, status, postDataDep, postDataWith) => {
    if (amount && descr) {
      if (condition === "DEP") {
        dispatch(
          postFun({
            api: api,
            postData: postDataDep,
            accessToken,
          })
        );

        if (status) {
          dispatch(setCurrentUnit(amount));
          dispatch(setAmount(""));
          dispatch(setDescr(""));
        }
      } else {
        dispatch(
          postFun({
            api: api,
            postData: postDataWith,
            accessToken,
          })
        );
        if (status) {
          dispatch(setCurrentUnit(amount));
          dispatch(setAmount(""));
          dispatch(setDescr(""));
        }
      }
      setError(false);
      setShowStatus(true);
    } else {
      setError(true);
    }
  };

  const clickHandle = () => {
    if (showStatus) {
      dispatch(setModalShow(false));
      setShowStatus(false);
    } else {
      if (currentUser === "Admin") {
        addUnitFun(
          "mainunitstransfer",
          postTransferUnit,
          postTransferStatus,
          postDataDep,
          postDataWith
        );
      } else if (currentUser === "Agent") {
        addUnitFun(
          "transferTo",
          postTransferUnit,
          postTransferStatus,
          postDataAgentDep,
          postDataAgentWith
        );
      }
    }
  };

  const cancelFun = () => {
    dispatch(setModalShow(false));
    setError(false);
    setShowStatus(false);
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={modalShow}
        onOk={clickHandle}
        onCancel={() => cancelFun()}
        cancelButtonProps={{ style: { display: "none" } }}
        width={700}
        okText={postTransferStatus === "loading" ? "Saving" : "Save"}
        className="modalStyle"
      >
        {showStatus ? (
          postTransfer && (
            <ErrorandSucc
              status={postTransfer}
              loading={postTransferStatus}
              condition={condition}
            />
          )
        ) : (
          <div className={styles.form_style}>
            {error && <Error message={"Fill All The Field"} />}
            <div className={styles.form}>
              <label>Unit</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => dispatch(setAmount(e.target.value))}
              />
            </div>
            <div className={styles.form}>
              <label>Description</label>
              <input
                type="text"
                value={descr}
                onChange={(e) => dispatch(setDescr(e.target.value))}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CustomBox;
